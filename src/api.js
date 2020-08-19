import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import chalk from "chalk";
import { useActions } from "./actions";
import { setupHandlers } from "./lights/handlers";
import { yeelightAdapter } from "./adapters/yeelight";
const { rooms } = require("../lights.json");

morgan.token("action", (req) => `Action ~> ${chalk.yellow(req.params.action)}`);
morgan.token("room", (req) => `Room ~> ${chalk.cyan(req.params.room)}`);

export function initApi(lights) {
  const getActions = useActions(yeelightAdapter);
  const { handleDim, handlePowerAction, handleColor } = setupHandlers(
    getActions
  );

  const app = express();

  app.use(bodyParser.json());
  app.use(morgan("dev"));

  app.post("/:room/:action", async (req, res) => {
    const { room, action } = req.params;
    const { intensity } = req.body;
    const lightsInRoom = lights.filter((x) =>
      (rooms?.[room] || []).some((id) => x.id === id)
    );

    if (lightsInRoom.length <= 0) return res.sendStatus(204);

    const mapLights = (fn) => Promise.all(lightsInRoom.map(fn));

    try {
      switch (action) {
        case "on":
        case "off":
          await mapLights(handlePowerAction(action, req.body));
          break;
        case "dim":
          await mapLights(handleDim(intensity));
          break;
        case "color":
          await mapLights(handleColor(req.body));
          break;
        default:
          break;
      }
      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
    }
  });

  app.listen(3000, () => console.log("server listening"));

  return app;
}
