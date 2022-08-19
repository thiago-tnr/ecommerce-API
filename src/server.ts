import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express'
import { ConnectionDB } from "./database/connection";
import { indexRoutes } from "./routes/index.routes";
import AppError from "./helpers/error/AppError";
import swaggerFile from './swagger.json'


const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(indexRoutes);
app.use((err:Error, request:Request, response:Response, next:NextFunction)=>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
});

ConnectionDB();

app.listen(3030, () => {
    console.log("Server is running !!!");
})