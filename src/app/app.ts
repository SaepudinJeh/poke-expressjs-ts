import express from "express";
import cors from 'cors';

import { router } from "../routes/index.route";
import { errorMiddleware } from "../middlewares/index.middleware";
import createHttpError from "http-errors";

export const app = express()
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(router)
app.use( (req,res,next) => {
    const error = createHttpError(404);
    next(error);
});
app.use(errorMiddleware)