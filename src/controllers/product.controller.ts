import { NextFunction, Request, Response } from "express";
import { CreateProductRequest, UpdateProductRequest } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { ResponseError } from "../helpers/error_response.helper";
import { QueryRequest } from "../models/query.model";

export class ProductController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: CreateProductRequest = req.body as CreateProductRequest;

            const response = await ProductService.create(payload);

            return res.status(201).json({
                statusCode: 201,
                message: "Success Created Product!",
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

            const payload: UpdateProductRequest = req.body as UpdateProductRequest;

            const response = await ProductService.update(id, payload);

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

            const response = await ProductService.delete(id)

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

            const result = await ProductService.getProducts(payload);

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

            const response = await ProductService.getProduct(id)

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