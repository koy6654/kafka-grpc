#!/bin/bash

docker stop Kafka00Container Kafka01Container Kafka02Container KafkaWebUiContainer ; \
docker rm Kafka00Container Kafka01Container Kafka02Container KafkaWebUiContainer ; \
docker-compose up -d
# docker-compose up -d && \
# nest start --watch
