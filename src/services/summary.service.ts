import { prisma } from "../app/database.app";

export class SummaryService {
    static async get() {
        const totalProduct = await prisma.products.count()
        const totalBrand = await prisma.brand.count()

        return {
            totalBrand,
            totalProduct
        }
    }
}