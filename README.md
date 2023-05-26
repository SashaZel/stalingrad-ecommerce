# Serverless ecommerce app.

JAM-stack app retrieves data from local machine .xlsx .json and .jpg files.

Uses Yandex YDB data base (analogue of AWS DynamoDB) for orders and stock storage. 

For frontend uses SSG Next.js. For backend API uses Yandex Functions (analogue of AWS Lambda).
CI/CD with Bash scripts and Yandex Cloud CLI.

## Documentation

### Managment app deployment

For CLI navigation in app features and deployment run ./run.sh

### Environment variables

.env for data folders, pictures and JavaScript AWS SDK stored in stalingrad-ecomm/.env

Env for AWS CLI stored in aws-config.sh

### Parsing already exist data

For parsing pictures data run ./data-parcer/index.mjs

Result will be a bunch of JSON files with pictures data, name, price etc. 

You have to put all data in 'Stalingrad-3042.json' (e.g. prices, description and others) manually.

You can safely run this parser a lot of times - all text data will be safe but pictures data will kept actual state of picture source folder.
These JSON files is useful for SSG Next.js app and total price calculation.

### SSG with Next.js
