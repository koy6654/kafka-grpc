#!/bin/bash

# Go to docker bash
# docker-compose exec -it Kafka01Service /bin/bash

# Topic 생성
# ./kafka-topics.sh --create --topic tester --bootstrap-server Kafka00Service:9092,Kafka01Service:9092,Kafka02Service:9092 --partitions 3 --replication-factor 2

# Console Producer, Consumer 테스트
# ./kafka-console-producer.sh --topic tester --bootstrap-server Kafka00Service:9092,Kafka01Service:9092,Kafka02Service:9092
# ./kafka-console-consumer.sh --topic tester --from-beginning --bootstrap-server Kafka00Service:9092,Kafka01Service:9092,Kafka02Service:9092
