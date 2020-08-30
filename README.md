<h1 align="center">DelilahRestoApi-localSQL</h1>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Documentation](#documentation)
- [Testing the Api](#testing)
- [Built Using](#built_using)
- [Authors](#authors)

##  About <a name = "about"></a>

The third project of Full Stack Developer Acamica's Certificate. This API handles restaurant orders, you can signup to place orders and save your favourite products. Administrators can post, update or delete meals, and change the order status.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have:
- [NodeJS](https://nodejs.org/) installed.
- [XAMPP](https://www.apachefriends.org/es/index.html) installed.
- [HeidiSQL](https://www.heidisql.com/download.php) installed, or another sql program to handle the host of MySQL local database.

### Installing

A step by step series of examples that tell you how to get a development env running.

Choose a folder and clone the repository

```
$ git clone https://github.com/shift-developer/DelilahRestoApi-localSQL.git
```

Then install the following dependencies

```
npm i express body-parser bcryptjs jsonwebtoken moment mysql2 sequelize

```

Now, you have to start sql server on XAMPP and create a new session on HeidiSQL called "delilah_resto_localdb". Run on them the sql file for database creation: `./db/database.sql`.


## 🎈 Usage <a name="usage"></a>

To run the api, simply run this on the terminal
```
node index.js
```

## 📄 Documentation <a name="documentation"></a>

Documentation can be found here
https://app.swaggerhub.com/apis-docs/shift-developer/DelilahRestoApi/1.0.0

## 🚀 Testing the API <a name = "testing"></a>

In order to test all the requests available of the app, there's a **Postman** Collection that you can find [here](https://documenter.getpostman.com/view/11768770/TVCZbBWD#81449741-6f9b-4b97-9e35-e844afd174ed).

🔐 If you need to have admin permissions (like Products administration) use this sample data:
```
username: admin
password: adminpass
```
User for tests:
```
username: ayuwoki_michael
password: moonwalk185
```

## ⛏️ Built Using <a name = "built_using"></a>

- [MySQL](https://www.mysql.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@shift-developer](https://github.com/shift-developer)

