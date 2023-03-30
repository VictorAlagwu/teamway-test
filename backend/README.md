# Backend API
For testing purposes

## Requirements
* Node v19.3.0
* Redis (https://redis.io/docs/stack/get-started/install/mac-os/)

## Setup

Install Node dependencies
```sh
$ yarn install
```

Create the environment variable using the example file
```sh
$ cp .env.example .env
```

To generate new questions using the seeder, run:

```sh
$ yarn run seeder:create-question
```


To start:

```sh
$ yarn run start 
```


Routes:

* GET api/v1/questions/: To get all the questions
* GET api/v1/questions/:id : To get a selected question
* POST api/v1/questions: To create a new question
* PATCH api/v1/questions/:id : To get update the selected question
* DELETE api/v1/questions/:id : To delete the selected question
* POST api/v1/questions/personality_traits: To get the traits for the selected questions

### TODO
* Add Tests
* Add routes to Postman collection or something member