import express from "express";
import bodyParser from "body-parser";
import { useActions } from "./actions";
import { setupHandlers } from "./lights/handlers";
import { yeelightAdapter } from "./adapters/yeelight";
const { rooms } = require("../lights.json");

export function initApi(lights) {
  const getActions = useActions(yeelightAdapter);
  const { handleDim, handlePowerAction, handleColor } = setupHandlers(
    getActions
  );

  const app = express();

  app.use(bodyParser.json());
  app.use(require("morgan")("dev"));

  app.post("/:room/:action", async (req, res) => {
    const { room, action } = req.params;
    const { intensity } = req.body;
    const lightsInRoom = lights.filter((x) =>
      (rooms?.[room] || []).some((id) => x.id === id)
    );

    if (lightsInRoom.length <= 0) return res.sendStatus(204).end();

    const mapLights = (fn) => Promise.all(lightsInRoom.map(fn));

    switch (action) {
      case "on":
      case "off":
        mapLights(handlePowerAction(action, req.body));
        break;
      case "dim":
        mapLights(handleDim(intensity));
        break;
      case "color":
        mapLights(handleColor);
        break;
      default:
        break;
    }

    return res.sendStatus(204);
  });

  app.listen(3000, () => console.log("server listening"));

  return app;
}
