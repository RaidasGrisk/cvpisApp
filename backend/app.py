from flask import Flask
app = Flask(__name__)

# include routes
import endpoints_is_up
import endpoints_email
import endpoints_frontend

app.add_url_rule('/is_up', view_func=endpoints_is_up.is_up)
app.add_url_rule('/unsubscribe', view_func=endpoints_email.remove_subscriber)
app.add_url_rule('/get_user_data', view_func=endpoints_frontend.get_user_data)
app.add_url_rule('/sync_user_data', view_func=endpoints_frontend.sync_user_data, methods=['POST', 'OPTIONS'])

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

