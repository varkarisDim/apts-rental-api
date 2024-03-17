# Appartments for Rent App<!-- omit in toc -->

## 4 Hour Coding Challenge<!-- omit in toc -->

This is the solution of Dimitrios Varkaris to a 4 hour coding challenge, implementing a demo of the back-end API of an appartment rental company.

## Table of contents <!-- omit in toc -->

-   [Description](#description)
-   [Tech Stack](#tech-stack)
-   [Requirements](#requirements)
-   [How to run it](#how-to-run-it)

## Description

-   Everything under users endpoint has authentication with jwt token, utilizing the passport library and requires a BEARER token in the header as Authorization
-   End2end testing was the preferred method of testing to simulate a user journey
-   End2end tests were implemented using the _pactum_ library
-   Even though there are end2end tests implemented as POC for the auth and the user modules (including authorization tests), I am also using the nestjs swaggerUI so you can test the full functionality of the api manually.
-   _**Important**_: When manually testing, if you want to test the api through the swaggerUI _**without**_ creating a new user and apartment, you should first send the POST request to the "/populateDb" endpoint so the dev database can be populated with mock data.
-   Everytime the application is run the database is being cleaned by composing down the docker image and then composing up, so if you restart the application you will need to run the POST to "/populateDb" again to have the mock data

## Tech Stack

-   NestJS
-   Prisma ORM
-   Docker

## Requirements

-   Docker<br/>
    Two postgres sql server docker images are being used by the api, one for development and one for end2end testing. The docker containers are being run on port 5434 for development and 5435 for testing. The databases are listening to the default postgres sql port 5432.
-   A unix shell (I used git bash on windows)
-   Package manager of choice is <ins>_npm_</ins> (several scripts depend on it)

## How to run it

The api is running at port 3334 of localhost.<br/>
All the commands should be run at the home folder of the project.<br/>

-   To install the dependencies run:

```bash
    npm install
```

-   To run the server and automatically open the embedded nestjs swagger api page (at http://localhost:3334/api).<br/>
    This command will also run the docker container at port 5434 with the image of the dev database. This is a custom npm script.<br/>
    Run:

```bash
    npm run start:chall
```

-   To run some end2end tests run (This will as well run the docker container at port 5435 with the test database):

```bash
    npm run test:e2e:chall
```
