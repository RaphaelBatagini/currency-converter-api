# Backend Software Engineer - SBF Group

This repository contains the code of an API to convert currencies developed as a technical test for SBF Group.

## Technologies :computer:

- NodeJS API with Typescript
- Redis server for cache
- PostgreSQL for database
- Jest for tests
- TypeORM for ORM

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

