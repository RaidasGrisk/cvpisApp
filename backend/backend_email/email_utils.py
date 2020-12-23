import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from private import email_creds


# TODO: i think the text part is not being shown in the email
def send_email(html_content, bottom_content, receiver_email=''):

    sender_email = 'subscription@othala.lt'
    receiver_email = receiver_email

    message = MIMEMultipart('alternative')
    message['Subject'] = 'Subscription email: daily pirkimai'
    message['From'] = sender_email
    message['To'] = receiver_email

    # Create the plain-text and HTML version of your message
    text = 'Hello, daily scubscription'

    html = """
    <html>
      <body>
        <p>
        {0}
        </p><br>
        <p style="font-size:80%;color:gray;">
        --------------------<br>
        {1}
        </p><br>
      </body>
    </html>
    """.format(html_content, bottom_content)

    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, 'plain')
    part2 = MIMEText(html, 'html')

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('bugienis.serveriai.lt', 465, context=context) as server:
        server.login(email_creds['acc'], email_creds['pass'])
        server.sendmail(
            sender_email, receiver_email, message.as_string()
        )
