from flask import Flask



    
# app.run('0.0.0.0', port=80)
# gunicorn --threads 4 -b 0.0.0.0:80 --access-logfile server.log --timeout 60 flaskr:create_app
# gunicorn -D --threads 4 -b 0.0.0.0:80 --access-logfile server.log --timeout 60 server:app