#!/bin/bash

base_url="http://localhost:5000/app"
header_content_type="Content-Type: application/json"

send_request() {
    local data="$1"

    local response=$(curl --location "$base_url" \
    --header "$header_content_type" \
    --data "$data" \
    -s)
}

send_request '{"message": "test_message_1"}'
send_request '{"message": "test_message_2"}'
send_request '{"message": "test_message_3"}'
send_request '{"message": "test_message_4"}'
send_request '{"message": "test_message_5"}'

echo "test.sh done!"
