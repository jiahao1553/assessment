# Assessment

This is an assessment for front-end and back-end development. 

Frameworks used:
- ReactJS
- ExpressJS

Database used:
- MongoDB

## Setup
Before building and running, please make sure the following are done:
1. Install docker [(setup guide)](https://docs.docker.com/get-started/)
2. Clone this repository using git

## Build
In the root directory, run the following:
```
docker build ./app/. -t cafe_react
docker build ./db/. -t cafe_seeder
docker build ./server/. -t cafe_express
```

## Run
In the root directory, run the following:
`docker-compose up -d`

Back-end can be accessed at: [http://localhost:8080](http://localhost:8080)

Front-end can be accessed at: [http://localhost:3000](http://localhost:3000)

## Stop the Instances
In the root directory, run the following:
`docker-compose down`
