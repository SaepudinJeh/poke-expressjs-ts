import { ZodType, z } from "zod";

export class BrandValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1),
        desc: z.string().min(1)
    }).required()

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).optional(),
        desc: z.string().min(1).optional()
    })

    static readonly DELETE: ZodType = z.object({
        id: z.number()
    }).required()

    static GET: ZodType = z.object({
        id: z.number()
    }).required()
}