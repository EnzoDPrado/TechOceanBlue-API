import { Trash } from "../database/schemas"

export interface OceanInfoResponse{
   Oceans: OceanResponse[]
}

export interface OceanResponse {
    name: string
    trashQuantity: number
    trashs: Trash[]
}



