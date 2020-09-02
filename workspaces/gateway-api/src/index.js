import { Discover, Yeelight, Color } from "yeelight-awesome";
import _Color from "color";
import express from "express";
import bodyParser from "body-parser";
const { rooms } = require("../lights.json");

const lightConf = { transition: "smooth", timeout: 400 };

const useActions = ({ connection }) => ({
  setBright({ intensity, transition, timeout }) {
    return connection.setBright(intensity, transition, timeout);
  },
  setPowerState({ state, transition, timeout }) {
    return connection.setPower(state === "on", transition, timeout);
  },
  setColor({ color = [], transition, timeout }) {
    return connection.setRGB(new Color(...color), transition, timeout);
  },
});

const toRGB = (hex) => new _Color(hex).rgb().toJSON();

const handlePowerAction = (action, body) => {
  const hasColor = body?.color;

  return async (light) => {
    const { setPowerState, setColor } = useActions(light);
    await setPowerState({ state: action, ...lightConf });

    if (hasColor) {
      await setColor({
        color: toRGB(`#${body.color}`).color,
        ...lightConf,
      });
    }

    return Promise.resolve();
  };
};

const handleDim = (intensity) => async (light) => {
  try {
    const { setBright } = useActions(light);
    await setBright({
      intensity: parseInt(intensity),
      ...lightConf,
    });
  } catch (e) {
    throw e;
  }
};

function initExpress(lights) {
  const app = express();

  app.use(bodyParser.json());
  app.use(require("morgan")("dev"));

  const getLightsInRoom = (room) => {
    // Get all ids of lights in a room
    const lightIds = rooms?.[room] || [];
    return lights.filter((x) => lightIds.some((id) => x.id === id));
  };

  app.post("/:room/:action", async (req, res) => {
    const { room, action } = req.params;
    const { intensity } = req.body;
    const lightsInRoom = getLightsInRoom(room);

    if (lightsInRoom.length <= 0) return res.sendStatus(204).end();

    switch (action) {
      case "on":
      case "off":
        try {
          await Promise.all(
            lightsInRoom.map(handlePowerAction(action, req.body))
          );
        } catch (e) {
          console.error(e);
        }
        break;
      case "dim":
        try {
          await Promise.all(lightsInRoom.map(handleDim(intensity)));
        } catch (e) {
          console.error(e);
        }
        break;
      case "color":
        try {
          await Promise.all(
            lightsInRoom.map((light) => {
              const { setColor } = useActions(light);
              return setColor({
                color: toRGB(`#${req.body.color}`).color,
                ...lightConf,
              });
            })
          );
        } catch (e) {
          console.error(e);
        }

        break;
      default:
        break;
    }

    return res.sendStatus(204);
  });

  app.listen(3000, () => console.log("server listening"));

  return app;
}

function connectToLight({ id, port, host }) {
  const connection = new Yeelight({
    lightId: id,
    lightPort: port,
    lightIp: host,
  });

  const light = { id, port, host, connection };

  return new Promise((resolve) => {
    const onConnected = () => resolve(light);
    light.connection.on("connected", onConnected);
    light.connection.connect();
  });
}

async function initLightConnection() {
  const discover = new Discover();
  const devices = (await discover.start()).filter(Boolean);

  const connectedDevices = await Promise.all(devices.map(connectToLight));

  return connectedDevices;
}

initLightConnection()
  .then(initExpress)
  .catch((e) => {
    console.error(e);
  });
