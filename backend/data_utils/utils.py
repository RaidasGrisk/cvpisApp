import datetime
import requests
import time


# try requesting for the page for X minutes
# return False if the page does not respond
def get_page(url, payload, minutes_to_keep_trying=5, seconds_of_sleep_between_tries=5):
    page = None
    time_start = datetime.datetime.now()
    while page is None:
        # check time passed
        time_current = datetime.datetime.now()
        minutes_passed = (time_current - time_start).seconds / 60
        if minutes_passed > minutes_to_keep_trying:
            print('The call has timed-out after {} minutes'.format(minutes_passed))
            return False
        try:
            page = requests.get(url, params=payload, timeout=5)
            return page
        except Exception as e:
            print(str(e))
            pass  # next while iter
        # if page is not responding wait a little
        time.sleep(seconds_of_sleep_between_tries)


# test
# get_page(url='http://www.r.lt', payload=None, minutes_to_keep_trying=1, seconds_of_sleep_between_tries=5)
