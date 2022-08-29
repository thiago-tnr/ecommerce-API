import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express'
import { ConnectionDB } from "./database/connection";
import { indexRoutes } from "./routes/index.routes";
import AppError from "./helpers/appError/AppError";
import swaggerFile from './swagger.json'
import dotenv from "dotenv";
import { logger } from "./helpers/logger/Logger";

dotenv.config();


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
    logger.info(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
});

ConnectionDB();

app.listen(3030, () => {
    logger.info("Server is running !!!");
})