FROM python:3.11

COPY . .

RUN pip3 install --upgrade pip

RUN pip3 install -r /requirements.txt

WORKDIR /app

EXPOSE 8080/tcp

CMD ["gunicorn", "--config", "gunicorn_config.py", "main:app"]