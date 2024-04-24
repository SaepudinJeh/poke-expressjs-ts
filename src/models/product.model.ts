import { Products } from "@prisma/client"

export type ProductResponse = {
    id?: number,
    name?: string,
    desc?: string,
    price?: number,
    stock?: number,
}

export type CreateProductRequest = {
    name: string,
    desc: string,
    price: number,
    stock: number,
    brandId: number
}


export type UpdateProductRequest = {
    name?: string,
    desc?: string,
    price?: number,
    stock?: number,
    brandId?: number
}

export type GetProductRequest = {
    id: number
}

export type RemoveProductRequest = {
    id: number,
    brandId: number
}

export default function toResponseProduct(product: Products): ProductResponse{
    return {
        id: product?.id,
        name: product?.name,
        desc: product?.desc,
        price: product?.price,
        stock: product?.stock
    }
}
