import couchdb
from private import couchdb_creds

# ---------------- #
# login as admin
# couchdb_creds['host'] = '34.123.231.211:5984'
url = f'http://{couchdb_creds["acc"]}:{couchdb_creds["pass"]}@{couchdb_creds["host"]}'
couchserver = couchdb.Server(url)

# ---------------- #
# define config
public_dbs = ['tenders', 'sutartys']
private_dbs = ['subscriptions']

# private
for db_name in private_dbs:
    db = couchserver.create(db_name)

# public
for db_name in public_dbs:

    # create db
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
      "validate_doc_update": "function(newDoc, oldDoc, userCtx) { if (userCtx.name === 'admin') { return; } else { throw ({ forbidden: 'Only admins may edit the database' }); } }"
    }
    couchserver[db_name].save(validation_fun)

    # ---------------- #
    # test permissions
    id_temp, _ = couchserver[db_name].save({'test': 1})
    couchserver_test = couchdb.Server('http://' + couchdb_creds['host'])

    # test: read
    for docid in couchserver_test[db_name].view('_all_docs'):
        try:
            doc_id = docid['id']
            print(doc_id, couchserver_test[db_name][doc_id])
        except Exception as e:
            print(e)

    # test: save
    try:
        id, rev = couchserver_test[db_name].save({'test': 2})
        print(id)
    except Exception as e:
        print(e)

    # test: modify
    new_doc = couchserver_test[db_name].get(id_temp)
    new_doc['asd2'] = 2
    try:
        couchserver_test[db_name].save(new_doc)
    except Exception as e:
        print(e)

    # clean
    doc_temp = couchserver_test[db_name].get(id_temp)
    couchserver[db_name].delete(doc_temp)


# ---------------- #
# create views

# count
view_fun = {
    "_id": "_design/doc_count_by_init_date",
    "views": {
        "doc_count_by_init_date": {
            "map": "function(doc) { emit(doc.init_date, 1); }",
            "reduce": "_count"
        }
    }
}
couchserver['tenders'].save(view_fun)

# count
view_fun = {
    "_id": "_design/doc_count_by_init_date",
    "views": {
        "doc_count_by_init_date": {
            "map": "function(doc) { emit(doc.init_date, 1); }",
            "reduce": "_count"
        }
    }
}
couchserver['sutartys'].save(view_fun)

# sum
view_fun = {
    "_id": "_design/doc_sum_by_init_date",
    "views": {
        "doc_sum_by_init_date": {
            "map": "function(doc) { emit(doc.init_date, doc.price); }",
            "reduce": "_sum"
        }
    }
}
couchserver['sutartys'].save(view_fun)

