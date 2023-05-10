#!/usr/bin/env sh

# abort on errors
set -e

cd src
powershell "Compress-Archive index.js function.zip"

mv function.zip ../public
cd ..

yc serverless function version create \
  --folder-name=stalingrad-ecommerce \
  --function-name=stalingrad-api \
  --runtime nodejs16 \
  --entrypoint index.handler \
  --memory 128m \
  --execution-timeout 3s \
  --source-path ./public/function.zip