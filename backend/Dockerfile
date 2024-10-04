FROM python:3.12.5-alpine3.19


WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apk update && \
	apk add  postgresql-dev gcc python3-dev musl-dev && \
    apk add --no-cache bash sudo && \
    ls /bin
RUN pip install --upgrade pip && \
	pip install psycopg2-binary && \
	pip install django-cors-headers

COPY . /app
COPY static/ /app/static/

RUN pip install -r requirements.txt
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]