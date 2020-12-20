# remove website from current nginx serving dir
# add new website files to the dir
rm -r /var/www/html/*
sudo cp /home/mrraidas/cvpisApp/dist/* /var/www/html/
