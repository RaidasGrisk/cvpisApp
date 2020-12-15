import couchdb
from private import couchdb_creds, unsub_config
from itsdangerous import URLSafeSerializer, exc
from flask import request
from flask import jsonify

# TODO: because this is no loger only tied to email
#  require more params, specifically, dbId
def unsub(email):
    url = f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}'
    couchserver = couchdb.Server(url)
    filter = {
        'selector': {'data': {'email': email}},
    }
    docs = couchserver['subscribers'].find(filter)
    doc = [i for i in docs][0]  # for now assume only one doc
    if doc: # cant use walrus op :((
        couchserver['subscribers'].delete(doc)
        return True
    else:
        return False  # 'No such email'


def remove_subscriber():

    token = request.args.get('token')
    if not token:
        return jsonify({'message': 'no token'}), 500

    s = URLSafeSerializer(unsub_config['secret_key'], salt=unsub_config['salt'])
    try:
        email = s.loads(token)
    except exc.BadSignature:
        return jsonify({'message': 'bad token'}), 500

    # do the actual unsub
    if unsub(email):
        return jsonify({'message': 'success'}), 200
    else:
        return jsonify({'message': 'fail, no such email'}), 500
