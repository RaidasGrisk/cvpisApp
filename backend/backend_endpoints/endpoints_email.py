import couchdb
from private import couchdb_creds, unsub_config
from itsdangerous import URLSafeSerializer, exc
from flask import request
from flask import jsonify


def delete_sub_doc(doc_id):
    url = f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}'
    couchserver = couchdb.Server(url)
    try:  # in case this is not a valid doc id
        doc = couchserver['subscriptions'][doc_id]
        couchserver['subscriptions'].delete(doc)
        return True
    except:
        return False


def remove_subscriber():

    token = request.args.get('token')
    if not token:
        return jsonify({'message': 'no token'}), 500

    s = URLSafeSerializer(unsub_config['secret_key'], salt=unsub_config['salt'])
    try:
        doc_id = s.loads(token)
    except exc.BadSignature:
        return jsonify({'message': 'bad token'}), 500

    print(doc_id)
    # do the actual unsub
    if delete_sub_doc(doc_id):
        return jsonify({'message': 'success'}), 200
    else:
        return jsonify({'message': 'fail, no such email (!?)'}), 500
