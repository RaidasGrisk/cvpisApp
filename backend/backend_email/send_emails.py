from backend_email.utils import get_search_conds, get_series_mask
from backend_email.email_utils import send_email
import pandas as pd
import datetime
import couchdb
from private import couchdb_creds, unsub_config, unsub_url, backend_domain
from itsdangerous import URLSafeSerializer


pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)
pd.set_option('display.width', 1000)


def send_emails():

    # read data
    client = couchdb.Server(f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}')

    period_days = 1  # [1 if datetime.date.today().weekday() != 0 else 3][0]
    time = datetime.date.today() - datetime.timedelta(days=period_days)
    query = {'selector': {'init_date': {'$gte': time.isoformat()}}, 'limit': 9999}
    tenders = client['tenders'].find(query)
    tender_data = pd.DataFrame([dict(row) for row in tenders])

    subscribers = client['subscriptions'].view('_all_docs', include_docs=True)
    subscribers = [dict(row.doc) for row in subscribers]

    for sub in subscribers:

        email = sub['email']
        search_string = sub['searchstring']

        search_conds = get_search_conds(search_string)
        mask = get_series_mask(data=tender_data['name'], cond_pairs=search_conds)
        email_data = tender_data[mask]
        email_data = email_data[email_data['tender_type'].isin(sub['tender_types'])]
        email_data = email_data[email_data['tender_class'].isin(sub['tender_classes'])]
        print('sub: {} {}'.format(email, len(email_data)), end=' // ')

        if len(email_data) == 0:
            print('no items for this email')
            continue

        # format email: combine name and url to one, limit columns, etc
        email_data['name_url'] = email_data.apply(
            lambda x: '<a target="_blank" href="{}">{}</a>'.format(x['url'], x['name']), axis=1)
        email_data = email_data[['name_url', 'init_date', 'deadline', 'buyer', 'tender_type', 'tender_class']]

        # additional content
        bottom_content = ''
        bottom_content += 'Paieškoje naudojami raktažodžiai: {}'.format(search_string) + '<br>'
        bottom_content += 'Pakeisti raktažodžius galite čia ' \
                          '<a href="{}">prenumeratą</a><br>'.format(backend_domain)

        # unsubscribe content
        s = URLSafeSerializer(unsub_config['secret_key'], salt=unsub_config['salt'])
        token = s.dumps(sub['_id'])  # send over the id of the doc
        unsub_url_ = unsub_url + '/unsubscribe?token=' + '{}'.format(token)
        bottom_content += 'Nutraukti prenumeratą galite <a href="{}">čia</a>'.format('http://' + unsub_url_)

        print(f'sending email: {email}', end=' // ')
        try:
            send_email(email_data.to_html(border=0, escape=False, index=False, justify='left'),
                       bottom_content,
                       email)
            print('success')
        except:
            print('fail')


if __name__ == '__main__':
    send_emails()