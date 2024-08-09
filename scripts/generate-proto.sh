#!/bin/bash

package_name="ts-proto"

if npm list --depth=0 | grep -q "$package_name@"; then
    echo "Package '$package_name' is installed."
else
    echo "Package '$package_name' is not installed."
    npm install --save-dev ts-proto
    npm install --save-dev protoc-gen-ts_proto
fi

file_dir=$(pwd)
project_dir=$(pwd)
# project_dir=$(dirname "$file_dir")

protoc \
    --plugin=protoc-gen-ts_proto=$(npm root)/.bin/protoc-gen-ts_proto \
    --ts_proto_out=$project_dir/src/models/types \
    --ts_proto_opt=useDate=true \
    --ts_proto_opt=emitDeclare=true \
    --ts_proto_opt=outputServices=grpc-js \
    --ts_proto_opt=esModuleInterop=true \
    --ts_proto_opt=exportCommonSymbols=false \
    --ts_proto_opt=outputJsonMethods=false \
    --ts_proto_opt=outputEncodeMethods=false \
    --ts_proto_opt=outputPartialMethods=false \
    --ts_proto_opt=outputServices=generic-definitions \
    --ts_proto_opt=outputServices=default \
    --ts_proto_opt=outputClientImpl=false \
    --ts_proto_opt=unrecognizedEnum=false \
    --ts_proto_opt=snakeToCamel=false \
    --proto_path=./src/models/proto \
    ./src/models/proto/*.proto
