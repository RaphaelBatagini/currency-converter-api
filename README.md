# Currency Converter API

This repository contains the code of a NodeJS API to convert currencies.

![Tests](https://github.com/RaphaelBatagini/currency-converter-api/actions/workflows/test.yml/badge.svg?branch=main)

## How it works
Receives a GET request at `/api/convert/{currency}/{amount}` and returns a JSON with the currency converted in the following format:
```json
{
  "USD": 98.23,
  "EUR": 83.26,
  "INR": 7318.93
}
```

## Technologies :computer:

- NodeJS
- Redis
- PostgreSQL
- Jest
- TypeORM
- Swagger

## Setup :gear:

1. Copy .env.example file to a new .env file and change any environment variable if needed;
2. Start docker with `docker-compose up` or `docker-compose up -d` and this will install all project dependencies;
3. Run migrations with this command:
```sh
docker-compose run currency-conversion-api-development sh -c "yarn migration:run"
```

## Running tests :test_tube:
1. Run tests with:
```sh
docker-compose -f docker-compose.test.yml --env-file .env.test run currency-conversion-api-test
```

2. Tests can be run with postgres database or an in memory database, you just have to change the REPOSITORY_TYPE in the .env.test file;

## Documentation :books:
Swagger documentation for the API can be found at `localhost:3000/docs`.

