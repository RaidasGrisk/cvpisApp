from bs4 import BeautifulSoup
import pandas as pd
import datetime
from data_handling.utils import get_page
import couchdb
from private import couchdb_creds

# options
pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)
pd.set_option('display.width', 10000)
pd.set_option('display.max_colwidth', -1)


# TODO: find a unique id in each sutartis
# TODO: current solution is crap
def cvpis_sutartys_hook(days_to_look_back=1):

    """
    important: column '_id' is mandatory for couchDB communication, lets not change it.

    :param days_to_look_back:
    :return: DataFrame
    """

    # this is main df
    # will append each batch to this
    # we need batches as each page shows 50 elements only
    # columns are initiated here because in the morning
    # there might be not sutartys for the day and empty df will throw an error
    df = pd.DataFrame(columns=['_id',
                               'name',
                               'buyer',
                               'supplier',
                               'procurement_type',
                               'price',
                               'init_date',
                               'end_date',
                               'type',
                               'pirkimo_nr'])

    date_start = (datetime.date.today() - datetime.timedelta(days=days_to_look_back)).strftime('%Y-%m-%d')

    # for each 50 elements
    for batch in [i*50 for i in list(range(9999))]:  # range(9999)

        # params
        payload = {'option': 'com_vptpublic',
                   'task': 'sutartys',
                   'Itemid': '109',
                   'filter_show': '1',
                   'filter_limit': '50',
                   'vpt_unite': '',
                   'filter_tender': '',
                   'filter_number': '',
                   'filter_proctype': '',
                   'filter_authority': '',
                   'filter_jarcode': '',
                   'filter_purchaseCode': '',
                   'filter_cpv': '',
                   'filter_valuefrom': '',
                   'filter_valueto': '',
                   'filter_contractdate_from': date_start,
                   'filter_contractdate_to': '',
                   'filter_expirationdate_from': '',
                   'filter_expirationdate_to': '',
                   'filter_supplier': '',
                   'filter_supplier_jarcode': '',
                   'filter_agreement_type': '',
                   'limitstart': batch}

        # -------- #
        # -------- #

        # get the page return df if server is not responding
        # this is to keep going even if unable to update atm
        page = get_page(url='http://www.cvpp.lt/index.php', payload=payload, minutes_to_keep_trying=3)
        if not page:
            return df

        soup = BeautifulSoup(page.text, 'html.parser')

        # find each tender in a soup: this is simple, all items are in table tr in two classes
        # but it is complicated as each second row contains extra information (sutarties nr)
        # we need this as some sutartys are exactly the same except for sutarties nr
        # hence we pull main_items and extra_items and later zip them together and loop
        main_items = soup.findAll('tr', {'class': ['vptpublic_main oddItem', 'vptpublic_main evenItem']})
        extra_items = soup.findAll('tr', {'class': ['vptpublic_extra oddItem', 'vptpublic_extra evenItem']})

        # we are not sure how many batches will there be hence
        # if the list is empty then stop the loop
        # the server will return a pacge but its table will be empty
        if len(main_items) == 0:
            # print('No more items in the page')
            break

        # empty df for this batch
        df_ = pd.DataFrame()

        # for each item and extra in batch
        for item, extra in zip(main_items, extra_items):

            # now item is a row in the table
            # lets loop over all hrefs to get multiple items we need
            temp = item.find_all('a', href=True)
            name = temp[1].text
            buyer = temp[2].text
            try:  # there are cases when supplier is not provided
                supplier = temp[4].text
            except IndexError:
                supplier = '-'

            # this one is an outlier cant get it from previous temp because it is not href
            procurement_type = item.find('span', {'class': 'ProcurementType'}).text

            # the rest of the items dont have specific tags
            # simply just items in specific columns
            temp = item.find_all('td')
            price = float(temp[4].text.replace('.', '').replace(',', '.').replace('€', ''))
            init_date = temp[5].text
            end_date = temp[6].text
            type = temp[7].text

            # now pull content from extra
            # for now the solution is a bit awkward
            # the html structure is hard to parse from
            temp = extra.find_all(['td'])[2].text

            # sutarties nr
            # it starts with 'sutarties numeris:' then follows either
            # 'Pirkimo numeris:' or 'Dokumentai'
            try:
                sutarties_nr = temp.split('Sutarties numeris:')[1].split('Pirkimo numeris:')[0].split('Dokumentai')[0]
            except IndexError:
                sutarties_nr = '-'

            # pirkimo nr
            try:
                pirkimo_nr = temp.split('Pirkimo numeris:')[1].split('Dokumentai:')[0]
            except IndexError:
                pirkimo_nr = '-'
            # pirkimo_nr = [pirkimo_nr if len(pirkimo_nr) > 0 else '-']

            # append items to batch
            # TODO: unidecode?
            df_ = df_.append({'_id': sutarties_nr,
                              'name': name,
                              'buyer': buyer,
                              'supplier': supplier,
                              'procurement_type': procurement_type,
                              'price': price,
                              'init_date': init_date,
                              'end_date': end_date,
                              'type': type,
                              'pirkimo_nr': pirkimo_nr},
                             ignore_index=True,
                             sort=False)

        # append batch to main df
        df = df.append(df_, ignore_index=True, sort=False)

    # clean up
    df = df[['_id', 'name', 'buyer', 'supplier', 'price', 'procurement_type',
             'init_date', 'end_date', 'type', 'pirkimo_nr']]
    df = df.replace('', '-')  # else empty strings will become nans after read_csv
    df = df.sort_values('init_date', ascending=False)

    return df


def cvpis_sutartys_update(days_to_look_back=1, update_duplicates=False):

    # parse latest items
    df = cvpis_sutartys_hook(days_to_look_back=days_to_look_back)

    # connect to db
    couchserver = couchdb.Server(f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}')
    db = couchserver['sutartys']

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
    print('{} new sutartys entries'.format(len([new_entry for new_entry, _, _ in item_statuses if new_entry])))

    return True
