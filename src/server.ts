import express, { request, response } from "express";
import { ConnectionDB } from "./database/connection";
import { indexRoutes } from "./routes/index.routes";
import bodyParser from "body-parser";
const app = express();

app.use(express.json());

app.use(indexRoutes);

ConnectionDB();

app.listen(3230, () => {
    console.log("Server is running !!!");
})