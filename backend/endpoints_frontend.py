import couchdb
from private import couchdb_creds
from flask import request
from flask import jsonify


def get_user_data():
    userId = request.args.get('userId')
    url = f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}'
    couchserver = couchdb.Server(url)
    filter = {'selector': {'userid': userId}}
    docs = couchserver['subscriptions'].find(filter)
    data = [dict(i) for i in docs]
    return jsonify({'data': data})


def sync_user_data():

    # this receives two requests upen each post request: options, post
    # https://dev.to/p0oker/why-is-my-browser-sending-an-options-http-request-instead-of-post-5621

    if request.method == 'OPTIONS':
        return jsonify({'message': 'ok'})

    if request.method == 'POST':
        url = f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}'
        couchserver = couchdb.Server(url)

        # get the data send from the frontend and current data in the db
        full_data = request.json
        new_data = full_data['userData']
        userid = full_data['userid']
        filter = {'selector': {'userid': userid}}
        old_docs = couchserver['subscriptions'].find(filter)
        old_data = [dict(i) for i in old_docs]

        # lets split the docs into new/updated/deleted
        new_docs, del_docs, edi_docs = [], [], []

        # new and updated docs
        for doc in new_data:
            if not doc.get('_id'):  # does not have an in in the db
                new_docs.append(doc)
            else: # does have an id, meaning an old record
                edi_docs.append(doc)

        # deleted docs
        new_ids = [i.get('_id') for i in new_data]
        for i in old_data:
            if i['_id'] not in new_ids:
                del_docs.append(i)

        [couchserver['subscriptions'].save(i) for i in new_docs]
        for i in edi_docs:
            couchserver['subscriptions'][i['_id']] = i
        for i in del_docs:
            couchserver['subscriptions'].delete(i)


        filter = {'selector': {'userid': userid}}
        docs = couchserver['subscriptions'].find(filter)
        return jsonify([dict(i) for i in docs])
