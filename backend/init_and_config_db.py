import couchdb
from private import couchdb_creds

# login as admin
couchdb_creds['host'] = 'localhost:5984'
url = f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}'
couchserver = couchdb.Server(url)

# create db
db_name = 'test'
db = couchserver.create(db_name)

# modify roles
# by default a newly created db will have this:
# {'members': {'roles': ['_admin']}, 'admins': {'roles': ['_admin']}}
# As defined in fauxton: Database members can access the database.
# If no members are defined, the database is public.
# this is what we want the db to be, except that later
# will restrict the db to be read-only to non admin users
couchserver[db_name].security = {'admins': {'roles': ['_admin']}}

# set permissions
# https://gist.github.com/ThibaultJanBeyer/389bca37f4b6973b84908895300bb7de
validation_fun = {
  "_id": "_design/auth",
  "language": "javascript",
  "validate_doc_update": "function(newDoc, oldDoc, userCtx) { if (userCtx.roles.indexOf('admin') !== -1) { return; } else { throw ({ forbidden: 'Only admins may edit the database' }); } }"
}
couchserver[db_name].save(validation_fun)

# test permissions
url = 'http://localhost:5984'
couchserver = couchdb.Server(url)

# test: read
for docid in couchserver[db_name].view('_all_docs'):
    try:
        doc_id = docid['id']
        print(doc_id, couchserver[db_name][doc_id])
    except Exception as e:
        print(e)

# test: save
id, rev = couchserver[db_name].save({'test': 1})
print(id)

# test: modify
new_doc = couchserver[db_name].get(id)
new_doc['asd2'] = 2
couchserver[db_name].save(new_doc)
