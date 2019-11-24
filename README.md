# pylint-api

Unofficial REST API for information about pylint messages.

## A little introduction

Pylint is a Python source code analyzer which looks for programming errors, helps enforcing a coding standard and sniffs for some code smells.
Read more about Pylint [here](https://github.com/PyCQA/pylint).

Running Pylint on your code will output messages, each with a code (looks like C0302) and a type.

The message type can be:

* **R**efactor for a "good practice" metric violation.
* **C**onvention for coding standard violation.
* **W**arning for stylistic problems, or minor programming issues.
* **E**rror for important programming issues (i.e. most probably bug).
* **F**atal for errors which prevented further processing.

This project will help you get more information about those messages.
The information is scraped from the [official Pylint messages wiki](http://pylint-messages.wikidot.com).

NOTE: The wiki lists all messages supported by PyLint 1.1.0, which is not the latest version of Pylint.

## Installation

```sh
git clone https://github.com/oriash93/pylint-api.git
cd pylint-api
npm install
```

## Running Locally

```sh
npm run start
```

To start the API server without scraping, use:

```sh
npm run api
```

## Deployed on

<https://pylint-api.herokuapp.com/all>

## API Usage

### All

Gets information about all the messages:

#### Development

<http://localhost:27017/all>

#### Production

<https://pylint-api.herokuapp.com/all>

### Code

Gets information about a specific message by its code:

#### Development

<http://localhost:27017/code/{code}>

#### Production

<https://pylint-api.herokuapp.com/code/{code}>

Example:

<https://pylint-api.herokuapp.com/code/R0914>

### Type

Gets information about messages by type:

NOTE: case insensitive

#### Development

<http://localhost:27017/type/{type|typeLetter}>

#### Production

<https://pylint-api.herokuapp.com/type/{type|typeLetter}>

Examples:

<https://pylint-api.herokuapp.com/type/error>

<https://pylint-api.herokuapp.com/type/Warning>

<https://pylint-api.herokuapp.com/type/c>

<https://pylint-api.herokuapp.com/type/F>

## Modules used

* [express](https://www.npmjs.com/package/express)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [cheerio](https://www.npmjs.com/package/cheerio)
* [lowdb](https://www.npmjs.com/package/lowdb)
* [request](https://www.npmjs.com/package/request)
