# remove website from current nginx serving dir
# add new website files to the dir
sudo rm -r /var/www/html/*
sudo cp -r /home/mrraidas/cvpisApp/frontend/dist/* /var/www/html/
