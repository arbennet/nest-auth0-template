# Overview
This is a basic NestJS app with bare minimum setup for:
- Security
- Auth0 and JWT gating

It is meant to be cloned to expedite projects.  In particular, it is meant to be paired with the front end package found here:

https://github.com/arbennet/react-starter-with-auth

# .env
```
PORT=
ISSUER_BASE_URL=
AUDIENCE=
CLIENT_ORIGIN_URL=
AUTH0_MANAGEMENT_API_URL=
AUTH0_MANAGEMENT_API_TOKEN=
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

