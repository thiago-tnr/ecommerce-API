# Getting Started

After download this project, you can run 

### `yarn init` or  `npm init`

## Available Scripts

In the project directory, you can run:

### `yarn dev:server`

To init the server and the app in the development mode.\
Open [http://localhost:3030/](http://localhost:3030/) to view "ping" in your browser or in the favorite REST API client tool

## Insomnia JSON

The insomnia JSON is disponible in this repository. This contains all routes of the application and examples for use

## Create User Validation Email and Forgot password

When you create a new user to test this api you need to define a real email as you will get a link to validate your user. After that, click on this link, take this link and submit the request in the insomnia. The same is valid to forgot password. See, no need to copy the "http://localhost/", just the endpoint.

User can manage or not, but some requests only admin can access (page manager/API)

## MongoDB Atlas Database

Is this API. i'm used the MongoDB Atlas Database. Is necessary to create account in the DB atlas, and create a new cluster. 
This link can help you to this: https://www.youtube.com/watch?v=esKNjzDZItQ

## Email to Nodemailer

To send email, this API use the gmail. Is necessary to configure your account to this. In the .end you need set your e-mail and the hashed password configuration in the security of accounts gmail.
This link can help you to this: https://www.youtube.com/watch?v=thAP7Fvrql4

## The payment method

In the payment is necessary to send a validate format card number (1111 2222 3333 4444), card expiration date (00/22) it must be greater than 22 and security code (111) which must have three numbers. This API will check if the card belongs to any brand, if the card does not belong, it will be invalid. This will be done by the initial card number.
if you want to generate card, this link can help you: https://www.4devs.com.br/gerador_de_numero_cartao_credito - only the date is needed to format to (MM/YY)

## Tech Stack
- Node.js
- TypeScript
- JWT
- MongoDB
- Express
- Nodemailer
- Swagger - it's not finished
## Tech Stack
If you need support, contact me: tnr.rocha@gmail.com