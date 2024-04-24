import { Brand } from "@prisma/client"

export type BrandResponse = {
    id?: number,
    name?: string,
    desc?: string
}

export type CreateBrandRequest = {
    name: string,
    desc: string
}


export type UpdateBrandRequest = {
    name?: string,
    desc?: string
}

export type GetBrandRequest = {
    id: string
}

export type RemoveBrandRequest = GetBrandRequest

export default function toResponseBrand(brand: Brand): BrandResponse{
    return {
        id: brand?.id,
        name: brand?.name,
        desc: brand?.desc,
    }
}
