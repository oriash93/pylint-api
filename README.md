# pylint-api
Unofficial REST API for information about pylint messages.

## A little introduction

Pylint is a Python source code analyzer which looks for programming errors, helps enforcing a coding standard and sniffs for some code smells.
Read more about Pylint [here](https://github.com/PyCQA/pylint).

Running Pylint on your code will output messages, each with a code (looks like <code>C0302</code>) and a type.
<br>The message type can be:
<br>

* **R**efactor for a "good practice" metric violation.
* **C**onvention for coding standard violation.
* **W**arning for stylistic problems, or minor programming issues.
* **E**rror for important programming issues (i.e. most probably bug).
* **F**atal for errors which prevented further processing.

This project will help you get more information about those messages.
The information is scraped from the [official Pylint messages wiki](http://pylint-messages.wikidot.com).

NOTE: The wiki lists all messages supported by PyLint 1.1.0, which is not the latest version of Pylint.

## Installation
```
$ git clone https://github.com/oriash93/pylint-api.git
$ cd pylint-api
$ npm install
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
https://pylint-api.herokuapp.com/all

## API Usage
### All
Gets information about all the messages:
#### Development
<code>http://localhost:27017/all</code>
#### Production
<code>https://pylint-api.herokuapp.com/all</code>

### Code
Gets information about a specific message by its code:
#### Development
<code>http://localhost:27017/code/{code}</code>
#### Production
<code>https://pylint-api.herokuapp.com/code/{code}</code>
<br>
<br>Example:
<br><code>https://pylint-api.herokuapp.com/code/R0914</code>

### Type
Gets information about messages by type:
<br>NOTE: case insensitive
#### Development
<code>http://localhost:27017/type/{type|typeLetter}</code>
#### Production
<code>https://pylint-api.herokuapp.com/type/{type|typeLetter}</code>
<br>
<br>Examples:
<br><code>https://pylint-api.herokuapp.com/type/error</code>
<br><code>https://pylint-api.herokuapp.com/type/Warning</code>
<br><code>https://pylint-api.herokuapp.com/type/c</code>
<br><code>https://pylint-api.herokuapp.com/type/F</code>

## Modules used
* [express](https://www.npmjs.com/package/express)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [cheerio](https://www.npmjs.com/package/cheerio)
* [lowdb](https://www.npmjs.com/package/lowdb)
* [request](https://www.npmjs.com/package/request)
* [@welldone-software/node-toolbelt](https://www.npmjs.com/package/@welldone-software/node-toolbelt)
