import couchdb
from private import couchdb_creds, unsub_config
from itsdangerous import URLSafeSerializer, exc
from flask import request
from flask import jsonify

from flask import Flask
app = Flask(__name__)


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


@app.route('/is_up')
def is_up():
    return 'True'


@app.route('/unsub', methods=['GET'])
def remove_subscriber():

    token = request.args.get('token')
    if not token:
        return jsonify({'message': 'no token'}), 500

    s = URLSafeSerializer(unsub_config['secret_key'], salt=unsub_config['salt'])
    try:
        email = s.loads(token)
    except exc.BadSignature:
        return jsonify({'message': 'bad token'}), 500

    if unsub(email):
        return jsonify({'message': 'success'}), 200
    else:
        return jsonify({'message': 'fail, no such email'}), 500


# as always issues with dev server and cors
@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == '__main__':
    app.run('0.0.0.0', port='23450')
