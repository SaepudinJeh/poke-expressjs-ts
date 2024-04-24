import { ZodType, z } from "zod";

export class ProductValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1),
        desc: z.string().min(1),
        price: z.number(),
        stock: z.number(),
        brandId: z.number()
    }).required()

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).optional(),
        desc: z.string().min(1).optional(),
        price: z.number().optional(),
        stock: z.number().optional(),
        brandId: z.number().optional()
    })

    static readonly DELETE: ZodType = z.object({
        id: z.number(),
        brandId: z.number()
    }).required()

    static GET: ZodType = z.object({
        id: z.number()
    }).required()
}