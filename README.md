# Node - Koa - Typescript Project

The main purpose of this repository is to build a good project setup and workflow for writing a Node api rest in TypeScript using KOA and an Mongo DB.

Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs. Through leveraging generators Koa allows you to ditch callbacks and greatly increase error-handling. Koa does not bundle any middleware within core, and provides an elegant suite of methods that make writing servers fast and enjoyable.


## Features:
 * Nodemon - server auto-restarts when code changes
 * Koa v2
 * Swagger decorator (auto generated swagger docs)
 * Class-validator - Decorator based entities validation
 * Locust load tests
 * Jest unit tests
 * Github actions - CI for building and testing the project
 * Cron jobs prepared

## Included middleware:
 * @koa/router
 * koa-bodyparser
 * Winston Logger
 * JWT auth koa-jwt
 * CORS
 * Passport
 * Passport Google oAuth 2.0

