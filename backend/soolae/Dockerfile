# backend/Dockerfile
FROM python:3.7
VOLUME /app
WORKDIR /app
COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install uwsgi
CMD uwsgi \
 --wsgi-file soolae/wsgi.py \
 --http :8000

