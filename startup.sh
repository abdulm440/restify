rm -r venv
virtualenv venv
source ./venv/bin/activate
pip install -r requirements.txt
cd Backend
python manage.py makemigrations user
python manage.py migrate
python manage.py makemigrations restaurant
python manage.py makemigrations socials
python manage.py migrate
