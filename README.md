# Task Manager

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...

## Outline

This project is a task manager for individuals, coworkers, couples... to help organize the user's schedule, improve their workload management and support their daily activities.

It is meant to be used both in PC and mobile, in the browser or as a PWA for ease of usage.

## Getting Started

The only prerequisite to run the project is:

- [Install Docker on your machine](https://docs.docker.com/get-docker/)

This project was created using the Docker `version 20.10.17` and Docker Compose `version 1.29.2`.

### Application Architecture

There are three main parts in the project:

- The `api` folder
- The `front` folder
- The `docker-compose.yml` file

The `api` folder is a **Ruby on Rails** API that is in charge of all the backend logic, authentication and authorization. It talks to a **PostgreSQL** database.

The `front` folder holds the frontend logic. It uses **React** for building the user interface and it is supported by **TypeScript** static type checking. The boilerplate was created using [Create React App](https://github.com/facebook/create-react-app).

Finally, the `docker-compose.yml` is in charge of building, configuring and deploying this multi-container application. There are three different containers that will be created: the PostgreSQL database (`db`), the API (`api`) and the frontend (`front`).

### Frameworks & Toolkit information

For the `API`:

- The language used is `Ruby` (version 3.1.2).
- For the API creation, `Ruby on Rails`(version 7.0.4) has been used. It is a popular Ruby framework for web development.
- For testing, `RSpec` and `Factory Bot` have been used. `RSpec` is a testing tool for Ruby whilst `Factory Bot`is a library that helps on creating fixtures for the tests.

For the `Database`:

- The database is `PostgreSQL` (latest version according to `Docker Hub`).

For the `Frontend`:

- The framework used is `React` (version 18.2.0).
- Also `TypeScript` (version 4.9.5) for the static type support.

## Get the project running

In the project directory, we run:

```
docker compose build
```

This will create three images that correspond to the three services in the `docker-compose.yml` file. The `api` and `front` images are built using their respective `Dockerfile`.

- Create, migrate and seed the database.

```
docker compose run --rm api rake db:create db:migrate db:seed
```

This will create a `development` database and seed it with a premade instance of the server we will be using.

- Run the container.

```
docker compose up
```

When finished, we will shut it down correctly and remove the running containers.

```
docker compose down
```

## Using the app locally

After running the app, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

### API

There are several tests put in place to make sure the `api` is running the way we expect to.
To run the tests we run the following command:

```
docker compose run --rm -e "RAILS_ENV=test" api bundle exec rspec
```

This will run the `api` container independently and pass the `test` environment as a variable for the database creation. The reason being that we want to separate the `development` database for when we interact with the `api` locally and use the `test` database when running tests.
