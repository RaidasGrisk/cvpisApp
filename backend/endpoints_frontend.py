import couchdb
from private import couchdb_creds
from flask import request
from flask import jsonify

def add_subscription(params):

    url = f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}'
    couchserver = couchdb.Server(url)

    params = {
        'userid': '110743650914525332003',
        'email': 'asdasd@asdasd',
        'searchstring': 'invest, proj',
        'tender_types': ['Skelbimas apie sutarties skyrimą', 'Savanoriškas išankstinis skaidrumo skelbimas'],
        'tender_classes': ['darbai', 'prekės', 'paslaugos']
    }

    doc_id, doc_rev = couchserver['subscriptions'].save(params)


def get_user_data():
    userId = request.args.get('userId')
    url = f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}'
    couchserver = couchdb.Server(url)
    filter = {'selector': {'userid': userId}}
    docs = couchserver['subscriptions'].find(filter)
    data = [dict(i) for i in docs]
    return jsonify({'data': data})


def sync_user_data():
    userData = request.json['userData']
    print(userData)

    # get userId
    for i in userData:
        # if there is no id, it means
        if i.get('userid'):
            userid = i.get('userid')

    # get

    filter = {'selector': {'userid': userId}}
    docs = couchserver['subscriptions'].find(filter)


    return jsonify({'message': 'ok'})