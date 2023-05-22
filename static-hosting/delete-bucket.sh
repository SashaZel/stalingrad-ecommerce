#!/usr/bin/env sh

# abort on errors
set -e

# yc version
yc storage bucket delete \
  --folder-name stalingrad-ecommerce \
  --name www.stalingrad-diorama.ru

# AWS CLI version
# be sure to hit the right folder and set right aws settings
# source ../aws-config.sh
# aws --endpoint-url=https://storage.yandexcloud.net \
#   s3 rb s3://stalingrad/