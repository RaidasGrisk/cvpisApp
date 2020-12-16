import re
import os


# def update_sub_list(email, search_string, TypeContractIds):
#     """
#     Adds a new line to subs if email not in table
#     Else updates fields of corresponding email
#     Also creates subs table if it does not exist
#
#     :param email: email of new or existing sub
#     :param search_string: search_string
#     :param TypeContractIds: darbai - 1, paslaugos - 2, prekes - 3
#     :return: {'new_sub': Bool} True for new False for old
#     """
#
#     # cb connection
#     conn = sqlite3.connect(os.path.join(ROOT_DIR, *['db', 'main.db']))
#     c = conn.cursor()
#
#     # create table if not exist
#     if not c.execute('SELECT name FROM sqlite_master WHERE type="table" AND name="subs"').fetchone():
#         print('Cannot access subs table in db, hence creating a new table named subs')
#         c.execute('create table if not exists subs (email TEXT, search_string TEXT, TypeContractIds TEXT)')
#         conn.commit()
#
#     # update if old sub
#     if c.execute('SELECT * FROM subs WHERE email = ?', (email, )).fetchone():
#         c.execute('UPDATE subs SET search_string = ?, TypeContractIds = ? where email = ?', (search_string, TypeContractIds, email))
#         conn.commit()
#         c.close()
#         return {'new_sub': False}
#     # add new if new sub
#     else:
#         c.execute('INSERT INTO subs VALUES (?, ?, ?)', (email, search_string, TypeContractIds))
#         conn.commit()
#         c.close()
#         return {'new_sub': True}

# test
# update_sub_list(email='raidas2131@gmail.com', search_string='DDAADa', TypeContractIds='1, 3')


# def unsub(email):
#
#     # cb connection
#     conn = sqlite3.connect(os.path.join(ROOT_DIR, *['db', 'main.db']))
#     c = conn.cursor()
#
#     # remove row
#     if c.execute('SELECT email FROM subs WHERE email=?', (email, )).fetchone():
#         c.execute('DELETE FROM subs WHERE email=?', (email,))
#         conn.commit()
#         c.close()
#         return True
#     else:
#         return False

# test
# unsub(email='bbb@bbb.bbb')


def get_search_conds(search_string):
    """
    :param search_string: example '(invest, proj), galim ,(a, b), stud'
    :return: list of lists where lists with len > 1 are AND conditions, else OR:
             [['invest', 'proj'], ['galim'], ['a', 'b'], ['stud']]
    """

    search_string = search_string.replace(' ', '').lower()

    # get AND pairs
    and_pairs = re.findall('\((.*?)\)', search_string)
    and_pairs = [i.split(',') for i in and_pairs]

    # not sure how to do this hence the following awkward solution
    # managed to find regext that works with curly brackets
    # so lets replace round with curly and get OR pairs
    or_pairs = re.split('{{.*?}}', search_string.replace('(', '{{').replace(')', '}}'))

    # split by , ravel the list
    or_pairs = [i.split(',') for i in or_pairs]
    or_pairs = [item for sublist in or_pairs for item in sublist]

    # remove non alphanum and empty strings
    or_pairs = [re.sub(r'\W+', '', i) for i in or_pairs]
    or_pairs = [[i] for i in or_pairs if len(i) > 1]

    cond_pairs = and_pairs + or_pairs

    return cond_pairs


def get_series_mask(data, cond_pairs):
    reg_string = ''
    for pair in cond_pairs:
        if len(pair) > 1:
            reg_string += '.*'.join(pair) + '|'
        else:
            reg_string += ''.join(pair) + '|'
    reg_string = reg_string[:-1]  # remove last or |
    mask = data.str.contains(reg_string)
    return mask

# test
# get_search_conds(search_string='(invest, proj), galim ,(a, b), stud, man')

