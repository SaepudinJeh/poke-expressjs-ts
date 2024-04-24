import { NextFunction, Request, Response } from "express";
import { SummaryService } from "../services/summary.service";

export class SummaryController {
    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await SummaryService.get()

            return res.status(200).json({
                statusCode: 200,
                message: "Success Get Summary",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}