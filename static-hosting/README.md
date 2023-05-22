Set of BASH scripts for creating, deleting ect.

Docs:
https://cloud.yandex.ru/docs/storage/operations/

Handmade pipeline of deployment from scratch: 
- create bucket stalingrad-diorama.ru
- set bucket stalingrad-diorama.ru as a hosting
- create bucket www.stalingrad-diorama.ru
- create redirect for www.stalingrad-diorama.ru to the stalingrad.diorama.ru
- create Cloud DNS with zone .stalingrad-diorama.ru
- create these settings in Cloud DNS

stalingrad-diorama.ru.
ANAME	600	
stalingrad-diorama.ru.website.yandexcloud.net
—	
stalingrad-diorama.ru.
NS	3600	
ns1.yandexcloud.net.
ns2.yandexcloud.net.
—	
stalingrad-diorama.ru.
SOA	3600	
ns1.yandexcloud.net. mx.cloud.yandex.net. 1 10800 900 604800 86400
—	
www.stalingrad-diorama.ru.
ANAME	600	
www.stalingrad-diorama.ru.website.yandexcloud.net

- create https sertificates throught Let's encripted and validate them