from flask import Flask
app = Flask(__name__)

# include routes
from backend_endpoints.endpoints_is_up import is_up
from backend_endpoints.endpoints_email import remove_subscriber
from backend_endpoints.endpoints_frontend import get_user_data, sync_user_data

app.add_url_rule('/is_up', view_func=is_up)
app.add_url_rule('/unsubscribe', view_func=remove_subscriber)
app.add_url_rule('/get_user_data', view_func=get_user_data)
app.add_url_rule('/sync_user_data', view_func=sync_user_data, methods=['POST', 'OPTIONS'])

# as always issues with dev server and cors
@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    response.headers.add("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    response.headers.add("Access-Control-Allow-Headers",
                       "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, "
                       "Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    return response


if __name__ == '__main__':
    app.run('0.0.0.0', port='23450')
