FROM debian:latest

RUN apt update && apt install -y make curl jq

COPY . .

CMD make e2e
