#!/usr/bin/env sh

# abort on errors
set -e

# AWS CLI version
# be sure to hit the right folder and set right aws settings
source ../aws-config.sh
# aws --endpoint-url=https://storage.yandexcloud.net/ \
#   s3 cp --recursive ./public/ s3://stalingrad/
aws --endpoint-url=https://storage.yandexcloud.net/ \
  s3 sync ../stalingrad-ecomm/out/ s3://stalingrad-diorama.ru/ --delete --exclude "pictures/*"