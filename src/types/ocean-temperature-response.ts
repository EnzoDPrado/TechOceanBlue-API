import { TemperatureRobot } from "database/schemas"

export interface OceansTemperaturesResponse{
   Oceans: OceanTemperatureResponse[]
}

export interface OceanTemperatureResponse {
    name: string
    temperatures: TemperatureRobot[]
}



