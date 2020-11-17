# HR-Advisor 📈
This repository contains various implementations of the Github REST API along with the development of custom API endpoints making use of algorithms for sorting data. The idea of the system is to have a portal that combines various Github Statistics into tables and charts that can be read and analized by human resources individuals to find out potential candidates for Software Engineering positions.

![screenshot](http://cselected.com/screenshot.png)


## Tech Stack 💻
- NodeJS (HapiJS Framework)
- HandlebarsJS Framework (Frontend Templating)
- Chai and Mocha (Testing Frameworks)
- Postman for simulating API calls

## Getting Started
1. Clone this respository
2. Go to the terminal and navigate to codebase
3. Run the following commands:

``` 
npm install
node app.js
```

4. Go to web broweser and navigate to http://localhost:3000/ the application should display

## Deploying with Docker
Navigate to codebase then run following commands assuming Docker is already installed on your computer

```
docker build -t HR-Advisor
docker run --publish 3000:3000 --detach --name pomelo_0.1 HR-Advisor
```

## Testing
- Inside the test folder you shall find a Postman collection containing the API endpoiints for this project along with some Unit test cases that can be used to test the application.
- The postman file documents the API and allows you to test the API by simulating HTTP requests(ensure server is running on localhost before testing)
- Inorder to run the unit tests, please run the following command

```
npm test
```
