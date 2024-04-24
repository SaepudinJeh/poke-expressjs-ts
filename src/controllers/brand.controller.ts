import { NextFunction, Request, Response } from "express";
import { CreateBrandRequest, UpdateBrandRequest } from "../models/brand.model";
import { BrandService } from "../services/brand.service";
import { ResponseError } from "../helpers/error_response.helper";
import { QueryRequest } from "../models/query.model";

export class BrandController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: CreateBrandRequest = req.body as CreateBrandRequest;

            const response = await BrandService.create(payload);

            return res.status(201).json({
                statusCode: 201,
                message: "Success Created Brand!",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params?.id)

            if(isNaN(id)) throw new ResponseError(400, "ID must be INT!");

            const payload: UpdateBrandRequest = req.body as UpdateBrandRequest;

            const response = await BrandService.update(id, payload);

            return res.status(200).json({
                statusCode: 200,
                message: "Success Updated Brand!",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params?.id)

            if(isNaN(id)) throw new ResponseError(400, "ID must be INT!");

            const response = await BrandService.delete(id)

            return res.status(200).json({
                statusCode: 200,
                message: "Success Deleed Brand!",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: QueryRequest = req.body as QueryRequest;

            const result = await BrandService.getBrands(payload);

            return res.status(200).json({
                statusCode: 200,
                message: "Success",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    static async getBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params?.id)

            if(isNaN(id)) throw new ResponseError(400, "ID must be INT!");

            const response = await BrandService.getBrand(id)

            return res.status(200).json({
                statusCode: 200,
                message: "Success Get Brand!",
                data: response
            })
        } catch (error) {
            next(error);
        }
    }
}