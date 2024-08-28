FROM python:3.12.5-alpine3.19

RUN apk update && \
    apk add --no-cache bash sudo && \
    ls /bin

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

CMD ["bash"]