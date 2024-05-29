"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const schemas_1 = require("./database/schemas");
const drizzle_orm_1 = require("drizzle-orm");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const cors = require('cors');
const server = (0, http_1.createServer)(app);
const port = process.env.PORT ?? 8080;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/api/v1/trash", cors(), jsonParser, async (req, res) => {
    const requestBody = req.body;
    if (!requestBody.location || !requestBody.robotId) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const oceans = await database_1.dataBase.query.ocean.findMany();
    const ocean = oceans.find((ocean) => {
        return (requestBody.location.latitude <= ocean.latitudeMax &&
            requestBody.location.latitude >= ocean.latitudeMin &&
            requestBody.location.longitude <= ocean.longitudeMax &&
            requestBody.location.longitude >= ocean.longitudeMin);
    });
    if (!ocean) {
        return res.status(400).json({ error: "Unknow location" });
    }
    const newTrash = await database_1.dataBase
        .insert(schemas_1.trash)
        .values({
        robotId: requestBody.robotId,
        latitude: requestBody.location.latitude,
        longitude: requestBody.location.longitude,
    })
        .returning({ id: schemas_1.trash.id });
    await database_1.dataBase.insert(schemas_1.oceanTrash).values({
        oceanId: ocean.id,
        trashId: newTrash[0].id,
    });
    res.status(200).json({ status: "success" });
});
app.post("/api/v1/temperature", cors(), jsonParser, async (req, res) => {
    const requestBody = req.body;
    if (!requestBody.location || !requestBody.robotId || !requestBody.temperatureCelsius) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const oceans = await database_1.dataBase.query.ocean.findMany();
    const ocean = oceans.find((ocean) => {
        return (requestBody.location.latitude <= ocean.latitudeMax &&
            requestBody.location.latitude >= ocean.latitudeMin &&
            requestBody.location.longitude <= ocean.longitudeMax &&
            requestBody.location.longitude >= ocean.longitudeMin);
    });
    if (!ocean) {
        return res.status(400).json({ error: "Unknow location" });
    }
    await database_1.dataBase.insert(schemas_1.temperatureRobot).values({
        oceanId: ocean.id,
        robotId: requestBody.robotId,
        temperatureCelsius: requestBody.temperatureCelsius
    });
    return res.status(200).json({ status: "Success" });
});
app.get("/api/v1/oceans/info", cors(), async (req, res) => {
    try {
        const oceansDatabase = await database_1.dataBase.query.ocean.findMany();
        const oceanInfos = await Promise.all(oceansDatabase.map(async (ocean) => {
            const oceanTrashs = await database_1.dataBase.query.oceanTrash.findMany({
                where: (0, drizzle_orm_1.eq)(schemas_1.oceanTrash.oceanId, ocean.id)
            });
            const trashList = await Promise.all(oceanTrashs.map(async (oceanInfo) => {
                const trashByOcean = await database_1.dataBase.query.trash.findFirst({
                    where: (0, drizzle_orm_1.eq)(schemas_1.trash.id, oceanInfo.trashId)
                });
                return trashByOcean;
            }));
            return {
                name: ocean.name,
                trashQuantity: oceanTrashs.length,
                trashs: trashList
            };
        }));
        const response = {
            Oceans: oceanInfos
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get("/api/v1/oceans/temperatures", cors(), async (req, res) => {
    try {
        const oceansDatabase = await database_1.dataBase.query.ocean.findMany();
        const oceanTemperatures = await Promise.all(oceansDatabase.map(async (ocean) => {
            const temperatureList = await database_1.dataBase.query.temperatureRobot.findMany({
                where: (0, drizzle_orm_1.eq)(schemas_1.temperatureRobot.oceanId, ocean.id)
            });
            return {
                name: ocean.name,
                temperatures: temperatureList
            };
        }));
        const response = {
            Oceans: oceanTemperatures
        };
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
server.listen(port, () => {
    console.log(`🚀 server is runing on port ${port}! 🚀`);
});
//# sourceMappingURL=index.js.map