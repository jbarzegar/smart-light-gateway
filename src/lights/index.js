import { Discover, Yeelight } from "yeelight-awesome";

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

export async function initLightConnection() {
  const discover = new Discover();
  const devices = (await discover.start()).filter(Boolean);

  const connectedDevices = await Promise.all(devices.map(connectToLight));

  return connectedDevices;
}
