import { Location } from "./location";

export interface TemperatureBody {
    robotId: string,
    location: Location
    temperatureCelsius: number
}
