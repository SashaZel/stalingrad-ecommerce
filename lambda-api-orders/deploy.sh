#!/usr/bin/env sh

# abort on errors
set -e

cd src
# powershell "Compress-Archive index.js function.zip"
powershell "Get-ChildItem -Path index.js, create-letter.js, package.json | Compress-Archive -DestinationPath function.zip"

mv function.zip ../public
cd ..

# config for DynamoDB account
source ../stalingrad-ecomm/.env
# export AWS_ACCESS_KEY_ID
# export AWS_SECRET_ACCESS_KEY
# export AWS_DEFAULT_REGION

yc serverless function version create \
  --folder-name=stalingrad-ecommerce \
  --function-name=stalingrad-api-orders \
  --runtime nodejs16 \
  --entrypoint index.handler \
  --memory 128m \
  --execution-timeout 3s \
  --source-path ./public/function.zip \
  --environment AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY,DOCUMENT_API_ENDPOINT=$DOCUMENT_API_ENDPOINT,EMAIL_PSWRD=$EMAIL_PSWRD