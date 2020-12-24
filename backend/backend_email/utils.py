import re


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
    # case=False is important, because in case this is not a regex string (say only a single search string word),
    # the str.contains op is case sensitive by default
    mask = data.str.contains(reg_string, case=False)
    return mask

# test
# get_search_conds(search_string='(invest, proj), galim ,(a, b), stud, man')

