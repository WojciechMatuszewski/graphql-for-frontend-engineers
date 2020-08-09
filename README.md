# GraphQL for Frontend Engineers

This is a repository used during the _GraphQL for frontend engineers_ workshop.

## Scope

The goal of this workshop is to get you comfortable working with `GraphQL` and `Apollo Client`.

We will cover:

- `query` operation

* `mutation` operation

- `fragments`

* Testing

- Basics of cache

* How `Apollo Links` work - **if we have time**.

## Schedule

The workshop will last up to 3 hours so that you are not overloaded with information.

- Introduction

* Setting up `Apollo Client`

- Querying data (with testing)

* **Break**

- Mutations and `fragments` (with testing)

* Code generation

- **Break**

* Basics of cache (with testing)

- `Apollo Links` - **if we have time**

## Prerequisites

You will need a couple of things installed on your local machine:

- Docker
- Node.JS 12+

To get the most out of this workshop you should be comfortable with `Typescript` and `React`.

## Validation and setup

To make sure everything is set up

1. Make sure _Docker_ is running on your machine

2. Run the validation script

```sh
make validate
```

## Starting the app

**After validation is successful** please run:

```sh
make start
```

The application is available at [http://localhost:3000](http://localhost:3000).

## Playground

Playground is there for you to explore the schema and operations that you can do. Whenever you are lost, not sure how to
define given operation, this is the place where you should look into (apart from asking me 🙂).

The playground is available at [http://localhost:4000/playground](http://localhost:4000/playground).
Before going there, **make sure you started the application**.
