#!/bin/bash

check_grpcurl_installed() {
    command -v grpcurl > /dev/null 2>&1
}

if check_grpcurl_installed; then
    echo "grpcurl is already installed."
else
    echo "grpcurl installing start."
    brew install grpcurl
fi

SERVER_ADDRESS="localhost:5000"
METHOD="kafka.AppService.SendMessage"
PROTO_FILE="src/models/proto/app.proto"
REQUEST_DATA='{"message": "GRPC test"}'

# gRPC 호출
grpcurl -plaintext -d "$REQUEST_DATA" -import-path "$(dirname "$PROTO_FILE")" -proto "$(basename "$PROTO_FILE")" "$SERVER_ADDRESS" "$METHOD" > /dev/null &&
grpcurl -plaintext -d "$REQUEST_DATA" -import-path "$(dirname "$PROTO_FILE")" -proto "$(basename "$PROTO_FILE")" "$SERVER_ADDRESS" "$METHOD" > /dev/null &&
grpcurl -plaintext -d "$REQUEST_DATA" -import-path "$(dirname "$PROTO_FILE")" -proto "$(basename "$PROTO_FILE")" "$SERVER_ADDRESS" "$METHOD" > /dev/null &&
grpcurl -plaintext -d "$REQUEST_DATA" -import-path "$(dirname "$PROTO_FILE")" -proto "$(basename "$PROTO_FILE")" "$SERVER_ADDRESS" "$METHOD" > /dev/null &&
grpcurl -plaintext -d "$REQUEST_DATA" -import-path "$(dirname "$PROTO_FILE")" -proto "$(basename "$PROTO_FILE")" "$SERVER_ADDRESS" "$METHOD" > /dev/null &&
echo "grpc test done..."
