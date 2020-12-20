# App start

1. ```web_backend.py``` > endpoints for the frontend (profile data, subscriptions, etc.). Must be running continually as is being used by the frontend.
2. ```send_emails.py``` > send emails to registered users (not related to frontend). Scheduled to run as cronjob every morning.
3. ```update_db.py``` > fetch data from cvpis and push it to the db. Scheduled to run as cronjob quite often (every other minute) to have up to date data.
