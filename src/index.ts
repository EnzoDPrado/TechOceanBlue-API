import { dataBase } from "./database";
import { Ocean, TemperatureRobot, Trash, oceanTrash, temperatureRobot, trash } from "./database/schemas";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { OceanInfoResponse, OceanResponse } from "./types/ocean-info-response";
import { OceanTemperatureResponse, OceansTemperaturesResponse } from "./types/ocean-temperature-response";
import { RegisterTrashBody } from "./types/register-trash-body";
import { TemperatureBody } from "./types/temperature-body";
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const cors = require('cors');
const server = createServer(app);
const port = process.env.PORT ?? 8080;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/api/v1/trash", cors(), jsonParser, async (req: Request, res: Response) => {
  const requestBody: RegisterTrashBody = req.body;

  if(!requestBody.location || !requestBody.robotId){
    return res.status(400).json({ error: "Missing required fields" });
  }

  const oceans = await dataBase.query.ocean.findMany();

  const ocean = oceans.find((ocean) => {
    return (
      requestBody.location.latitude <= ocean.latitudeMax &&
      requestBody.location.latitude >= ocean.latitudeMin &&
      requestBody.location.longitude <= ocean.longitudeMax &&
      requestBody.location.longitude >= ocean.longitudeMin
    );
  });

  if (!ocean) {
    return res.status(400).json({ error: "Unknow location" });
  }

  const newTrash = await dataBase
    .insert(trash)
    .values({
      robotId: requestBody.robotId,
      latitude: requestBody.location.latitude,
      longitude: requestBody.location.longitude,
    })
    .returning({ id: trash.id });

    await dataBase.insert(oceanTrash).values({
        oceanId: ocean.id,
        trashId: newTrash[0].id,
    })

    res.status(200).json({status: "success"})
});

app.post("/api/v1/temperature", cors(), jsonParser, async (req:Request, res:Response) => {
  const requestBody: TemperatureBody = req.body;

  if(!requestBody.location || !requestBody.robotId || !requestBody.temperatureCelsius){
    return res.status(400).json({ error: "Missing required fields" });
  }

  const oceans = await dataBase.query.ocean.findMany();

  const ocean = oceans.find((ocean) => {
    return (
      requestBody.location.latitude <= ocean.latitudeMax &&
      requestBody.location.latitude >= ocean.latitudeMin &&
      requestBody.location.longitude <= ocean.longitudeMax &&
      requestBody.location.longitude >= ocean.longitudeMin
    );
  });

  if (!ocean) {
    return res.status(400).json({ error: "Unknow location" });
  }

  await dataBase.insert(temperatureRobot).values({
    oceanId: ocean.id,
    robotId: requestBody.robotId,
    temperatureCelsius: requestBody.temperatureCelsius
  })

  return res.status(200).json({ status: "Success" });

})

app.get("/api/v1/oceans/info", cors(), async (req:Request, res: Response) => {
  try {
    const oceansDatabase = await dataBase.query.ocean.findMany();

    const oceanInfos: OceanResponse[] = await Promise.all(oceansDatabase.map(async (ocean) => {
      const oceanTrashs = await dataBase.query.oceanTrash.findMany({
        where: eq(oceanTrash.oceanId, ocean.id)
      });

      const trashList: Trash[] = await Promise.all(oceanTrashs.map(async (oceanInfo) => {
        const trashByOcean = await dataBase.query.trash.findFirst({
          where: eq(trash.id, oceanInfo.trashId)
        });
        return trashByOcean!;
      }));

      return {
        name: ocean.name,
        trashQuantity: oceanTrashs.length,
        trashs: trashList
      };
    }));

    const response: OceanInfoResponse = {
      Oceans: oceanInfos
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/v1/oceans/temperatures", cors(), async (req, res: Response) => {
  try {
    const oceansDatabase = await dataBase.query.ocean.findMany();

    const oceanTemperatures: OceanTemperatureResponse[] = await Promise.all(oceansDatabase.map(async (ocean) => {

      const temperatureList: TemperatureRobot[] = await dataBase.query.temperatureRobot.findMany({
        where: eq(temperatureRobot.oceanId, ocean.id)
      });

      return {
        name: ocean.name,
        temperatures: temperatureList
      };
    }));

    const response: OceansTemperaturesResponse = {
      Oceans: oceanTemperatures
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


server.listen(port, () => {
  console.log(`🚀 server is runing on port ${port}! 🚀`);
});
