#!/usr/bin/env sh

# abort on errors
set -e

# yc version
echo ...Creating main bucket
yc storage bucket create \
  --folder-name stalingrad-ecommerce \
  --name stalingrad-diorama.ru \
  --default-storage-class standard \
  --max-size 524288000 \
  --public-read 

echo ...set main bucket as a hosting
yc storage bucket update \
  --folder-name stalingrad-ecommerce \
  --name stalingrad-diorama.ru \
  --website-settings-from-file ./hosting-setting.json

echo ...Creating empty bucket for www. requests
yc storage bucket create \
  --folder-name stalingrad-ecommerce \
  --name www.stalingrad-diorama.ru \
  --default-storage-class standard \
  --max-size 88000 \
  --public-read 

echo ...set empty bucket for redirect
yc storage bucket update \
  --folder-name stalingrad-ecommerce \
  --name www.stalingrad-diorama.ru \
  --website-settings-from-file ./redirect-setting.json