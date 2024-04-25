import express from "express";
import cors from 'cors';

import { router } from "../routes/index.route";
import { errorMiddleware } from "../middlewares/index.middleware";

export const app = express()
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(router)
app.use(errorMiddleware)