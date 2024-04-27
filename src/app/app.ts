import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from 'morgan';

import { router } from "../routes/index.route";
import createHttpError, { HttpError } from "http-errors";
import { errorMiddleware } from "../middlewares/index.middleware";

export const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(router);
app.use(errorMiddleware)