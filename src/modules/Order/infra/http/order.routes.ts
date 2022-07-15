import { Router } from "express";

export const routes = Router();

routes.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})
