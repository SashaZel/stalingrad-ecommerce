#!/usr/bin/env sh

# abort on errors
set -e

# Yandex Cloud CLI version
# yc storage bucket list \
#  --folder-name stalingrad-ecommerce

# AWS CLI version
# be sure to hit the right folder and set right aws settings
source ../aws-config.sh
aws --endpoint-url=https://storage.yandexcloud.net s3 ls

# source ../aws-config.sh
# aws  --endpoint-url=https://docapi.serverless.yandexcloud.net/ru-central1/b1gqhv2u3lvm05cq8f2a/etncso7265fvoooj2emd dynamodb list-tables
# aws configure
