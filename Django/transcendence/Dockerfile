FROM python:3.12.5-alpine3.19


WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apk update && \
	apk add  postgresql-dev gcc python3-dev musl-dev && \
    apk add --no-cache bash sudo && \
    ls /bin
RUN pip install --upgrade pip

COPY . /app

RUN pip install -r requirements.txt

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "transcendence.wsgi:application"]