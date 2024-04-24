import { Products } from "@prisma/client";
import { prisma } from "../app/database.app";
import toResponseProduct, { CreateProductRequest, ProductResponse, UpdateProductRequest } from "../models/product.model";
import { ProductValidation } from "../validations/product.validation";
import { Validation } from "../validations/validation";
import { BrandService } from "./brand.service";
import { ResponseError } from "../helpers/error_response.helper";
import { QueryValidation } from "../validations/query.validation";
import { QueryRequest } from "../models/query.model";

export class ProductService {
    static async create(payload: CreateProductRequest): Promise<ProductResponse> {
        const validation = Validation.validate(ProductValidation.CREATE, payload)

        // Validation id brand / merk
        await BrandService.getBrand(validation?.brandId);

        const result = await prisma.products.create({
            data: { ...validation }
        })

        return toResponseProduct(result)
    }

    static async update(id: number, payload: UpdateProductRequest): Promise<ProductResponse> {
        const validation = Validation.validate(ProductValidation.UPDATE, payload);

        const productExist = await prisma.products.findFirst({
            where: { id }
        })

        if(!productExist) throw new ResponseError(400, "Product Not Exist!");

        // / Validation id brand / merk
        if(validation?.brandId) await BrandService.getBrand(validation?.brandId);

        const result = await prisma.products.update({
            where: { id },
            data: { ...validation }
        })

        return result
    }

    static async delete(id: number): Promise<string> {
        const productExist = await prisma.products.findFirst({
            where: { id }
        })

        if(!productExist) throw new ResponseError(400, "Product Not Exist!");

        await prisma.products.delete({
            where: { id },
            include: { brand: true }
        })

        return "Success Deleted Product!"
    }

    
    static async getProducts(query: QueryRequest): Promise<Products[]> {
        const validation = Validation.validate(QueryValidation.QUERY_TEXT, query);

        const result = await prisma.products.findMany({
            where: {
                name: validation.search
            },
            include: { brand: true }
        })

        return result;
    }

    static async getProduct(id: number) {
        const result = await prisma.products.findFirst({
            where: { id },
            include: { brand: true }
        })

        if(!result) throw new ResponseError(400, "Product Not Exist!");

        return result;
    }
}