from bs4 import BeautifulSoup
import pandas as pd
import datetime
from data_utils.utils import get_page
import couchdb
from private import couchdb_creds


# options
pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)
pd.set_option('display.width', 10000)
pd.set_option('display.max_colwidth', -1)


def cvpis_tender_hook(days_to_look_back=1):

    """
    important: column '_id' is mandatory for couchDB communication, lets not change it.

    :param days_to_look_back:
    :return: DataFrame
    """

    # init
    df = pd.DataFrame(columns=['_id', 'name', 'url', 'buyer', 'init_date', 'deadline', 'tender_type', 'tender_class'])
    date_start = (datetime.date.today() - datetime.timedelta(days=days_to_look_back)).strftime('%Y-%m-%d')
    date_end = datetime.date.today().strftime('%Y-%m-%d')

    # field mapping
    TypeContractIds_mapping = {1: 'darbai', 2: 'paslaugos', 3: 'prekės'}

    # params
    payload = {
               # 'Query': '',
               # 'OrderingType': '0',
               # 'OrderingDirection': '0',
               # 'TypeContractIds': '',  # darbai - 1, paslaugos - 2, prekes - 3
               # 'ProcedureSearchTypeIds': '',  # 1 - atviras konkursas, 2 - ribotas konkursas, 3 - derybos, 4 - konkurencinis dialogas, 5 - inovacijų partneryste, 6 - projekto konkursas
               # 'NoticeTypeIds': '',  # 1 - išankstinis info pranešimas, 2 - skelbimas apie pirkimą, 3 - skelbimas apie sutarties sudarymą, 4 - skaidrumo skelb., 5  - skelb. prikėjo profilyje, 6 - skelbimas apie pasikeitimą
               # 'PublicationType': '',
               # 'SectorSearchTypeId': '',
               # 'IncludeExpired': 'false',
               # 'Cpvs': '',
               # 'TenderId': '',
               # 'DeadlineFromDate': '',
               # 'DeadlineToDate': '',
               'PublishedFromDate': date_start,
               'PublishedToDate': date_end,
               'PageNumber': '1',
               'PageSize': '10000'
              }

    # -------- #
    # -------- #

    # No other way to figure out some info other than search for it particularly.
    # This holds true for many params: TypeContractId, ProcedureSearchTypeId, NoticeType, etc.
    # Pretty poor solution because of exponential time increase, but cant find other way around.
    for TypeContractIds in [1, 2, 3]:

        # modify payload params
        payload['TypeContractIds'] = TypeContractIds

        # get the page return df if server is not responding
        page = get_page(url='https://cvpp.eviesiejipirkimai.lt', payload=payload, minutes_to_keep_trying=3)
        if not page:
            print('Returning unfinished df with len {}'.format(len(df)))
            return df

        # print(page.url)
        soup = BeautifulSoup(page.text, 'html.parser')

        # find each tender in a soup: this is simple, all items are same class_
        items = soup.findAll('div', class_='notice-search-item')

        # for each tender
        for item in items:

            # first lets determine if it is LTU or EU tender
            # because the structure of these are different
            # TODO: this is not necessary
            # class_flag = ['LTU' if 'flag_lt' in header.find(class_='pull-right').get('src') else 'EU'][0]

            # inside header there is tender name and url
            # TODO: a bit awkward but works for now
            header = item.find(class_='notice-search-item-header')
            temp = header.findAll('a', href=True)[-1]
            name = temp.text
            url = 'https://cvpp.eviesiejipirkimai.lt/' + temp.get('href')

            # inside left-col there is buyer and other info
            left_col = item.find(class_='left-col')
            try:  # if buyer is not a link then the structure is different
                buyer = left_col.find('a').text
            except AttributeError:
                buyer = left_col.find('div').text
                buyer = buyer.replace('\r\n', ' ').split(':')[-1]
                buyer = " ".join(buyer.split())
            tender_type = left_col.findAll('div')[1].text.split(': ')[-1]

            # inside right-col there is tender code, deadline, init date
            right_col = item.find(class_='right-col')
            id = right_col.findAll('div')[0].text.split(':')[-1].strip()
            try:  # sometimes this info is not present, mostly if deadline is long past
                deadline = right_col.find(class_='label label-info').text
            except AttributeError:
                deadline = '-'

            # init date is still inside right-col
            # now I do a search where word paskelbimo is present and save this date
            # init_date = right_col.findAll('div')[-1].text.split(': ')[-1]
            right_col_divs = [i.text for i in right_col.findAll('div')]
            init_date = [i for i in right_col_divs if 'paskelbimo' in i.lower()][0].split(': ')[-1]

            # save info
            # TODO: unidecode?
            df = df.append({'_id': id,
                            'name': name,
                            'url': url,
                            'buyer': buyer,
                            'init_date': init_date,
                            'deadline': deadline,
                            'tender_type': tender_type,
                            'tender_class': TypeContractIds_mapping[TypeContractIds]
                            },
                           ignore_index=True,
                           sort=False)

    # format email/table: combine name and url to one, limit columns, etc
    # df[['name']] = df[['name']].apply(lambda x: x.str.lower())
    # df['name_url'] = df.apply(
    #     lambda x: '<a target="_blank" href="{}">{}</a>'.format(x['url'], x['name']), axis=1)

    # df = df[['name', 'init_date', 'deadline', 'buyer', 'tender_type', 'TypeContractIds', 'url', 'name_url']]

    return df


def cvpis_tender_update(days_to_look_back=1, update_duplicates=False):

    # parse latest items
    df = cvpis_tender_hook(days_to_look_back=days_to_look_back)

    # connect to db
    couchserver = couchdb.Server(f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}')
    db = couchserver['tenders']

    # update db by:
    # we could iter over each item, but this is too slow
    # instead lets try updating all - this will insert new items
    # and return conflicts for the already existing items
    # then for each existing item we can update or just ignore
    item_statuses = db.update(df.to_dict(orient='records'))
    if update_duplicates:
        for item_status, (_, item) in zip(item_statuses, df.iterrows()):
            success, docid, _ = item_status
            if not success:
                item_updated = item.to_dict()
                item_updated['_rev'] = db[docid]['_rev']
                _ = db.update([item_updated])

    # count new entries
    print('{} new tender entries'.format(len([new_entry for new_entry, _, _ in item_statuses if new_entry])))

    return True

#
# import couchdb
# import pandas as pd
#
# # connect
# couchserver = couchdb.Server('http://{}:{}@localhost:5984'.format('admin', '123'))
# [print(db) for db in couchserver]
#
# # create db
# couchserver.delete('tenders')
# db = couchserver.create('tenders')
#
# # get table
# db = couchserver['tenders']
# rows = db.view('_all_docs', include_docs=True)
# data = pd.DataFrame([row['doc'] for row in rows])
#
# # get new data
# df = cvpis_tender_hook(days_to_look_back=1)
#
# # modify new data
# df = df.iloc[:3, :]
# df.iloc[0, 1] = 'AAA' + df.iloc[0, 1]
# df = df.append(df.iloc[0, :])
# df.iloc[-1, 0] = 'A-' + df.iloc[-1, 0]
#
# # save new data / update existing data
# [db.save(row) for row in df.to_dict(orient='records')]
# update_response = db.update(df.to_dict(orient='records'))
# any([i[0] for i in update_response])
#
#
# # select logic
# query = {'selector':
#          {
#              'buyer': {"$regex": "^Lietuvos d"},
#              # 'TypeContractIds': 1
#          },
#          }
# response = db.find(query)
# df_ = pd.DataFrame([dict(row) for row in response])
# df_.head(1)


# # could we do single update with existing records?
# # to implement this one last thing is missing:
# # need to retrieve _rev's of multiple docs with single call.
# # not_successful = [not i[0] for i in item_statuses]
# # not_successful_ids = df['_id'][not_successful].tolist()
# # not_successful_revs = db[not_successful_ids]['_revs']
# # ...
#
# # update db by:
# # we could iter over each item, but this is too slow
# # instead lets try updating all - this will insert new items
# # and return conflicts for the already existing items
# # then for each existing item we can update or just ignore
# item_statuses = db.update(df.to_dict(orient='records'))
# update_duplicates = False
# if update_duplicates:
#     for item_status, (_, item) in zip(item_statuses, df.iterrows()):
#         success, docid, _ = item_status
#         if not success:
#             item_updated = item.to_dict()
#             item_updated['_rev'] = db[docid]['_rev']
#             _ = db.update([item_updated])
