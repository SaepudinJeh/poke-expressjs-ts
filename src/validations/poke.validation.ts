import { ZodType, z } from 'zod';

export class PokeValidation {
    static readonly CATCH: ZodType = z.object({
        poke: z.string().min(1),
        username: z.string().min(1),
    }).required()

    static readonly RENAME: ZodType = z.object({
        id: z.number(),
        name: z.string().min(1),
    }).required()

    static readonly BY_ID: ZodType = z.object({
        id: z.number()
    }).required()

    static readonly BY_USERNAME: ZodType = z.object({
        username: z.string().min(1)
    }).required()

    static readonly BY_POKE: ZodType = z.object({
        poke: z.string().min(1)
    }).required()
}