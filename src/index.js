const { Discover, Yeelight, Color } = require("yeelight-awesome");
const _Color = require("color");
const express = require("express");
const bodyParser = require("body-parser");
const { get } = require("lodash");
const { rooms } = require("../lights.json");

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

function initExpress(lights) {
  const app = express();

  app.use(bodyParser.json());
  app.use(require("morgan")("dev"));

  const getLightsInRoom = (room) => {
    // Get all ids of lights in a room
    const lightIds = get(rooms, room, []);
    return lights.filter((x) => lightIds.some((id) => x.id === id));
  };

  app.post("/:room/:action", async (req, res) => {
    const { room, action } = req.params;
    const { intensity } = req.body;
    const lightsInRoom = getLightsInRoom(room);

    if (lightsInRoom.length <= 0) return req.sendStatus(204).end();

    const lightConf = { transition: "smooth", timeout: 400 };

    switch (action) {
      case "on":
      case "off":
        try {
          lightsInRoom.forEach(async (light) => {
            const { setPowerState, setColor } = useActions(light);
            if (get(req.body, "color")) {
              await setColor({
                color: toRGB(`#${req.body.color}`).color,
                ...lightConf,
              });
            }
            setPowerState({ state: action, ...lightConf }).catch(console.error);
          });
        } catch (e) {
          console.error(e);
        }
        break;
      case "dim":
        try {
          lightsInRoom.forEach((light) => {
            const { setBright } = useActions(light);
            setBright({
              intensity: parseInt(intensity),
              ...lightConf,
            }).catch(console.error);
          });
        } catch (e) {
          console.error(e);
        }
        break;
      case "color":
        try {
          lightsInRoom.forEach((light) => {
            const { setColor } = useActions(light);
            setColor({
              color: toRGB(`#${req.body.color}`).color,
              ...lightConf,
            }).catch(console.error);
          });
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
  const light = {
    connection: new Yeelight({ lightId: id, lightPort: port, lightIp: host }),
    id,
    port,
    host,
  };

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
