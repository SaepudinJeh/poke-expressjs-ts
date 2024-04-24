import { ZodType, z } from "zod";

export class QueryValidation {
    static readonly QUERY_TEXT: ZodType = z.object({
        search: z.string().optional()
    })
}