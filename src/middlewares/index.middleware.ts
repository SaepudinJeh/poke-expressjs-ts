import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../helpers/error_response.helper";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof ZodError) {
        res.status(400).json({
            statusCode: 400,
            message: error?.errors
        })
    }

    if (error instanceof ResponseError) {
        res.status(error?.status).json({
            statusCode: error?.status,
            message: error?.message
        })
    }

    res.status(500).json({
        statusCode: 500,
        message: error?.message
    })
}