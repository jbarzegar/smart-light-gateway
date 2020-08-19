import { Color } from "yeelight-awesome";

export const yeelightAdapter = ({ connection }) => ({
  setBrightness({ intensity, transition, timeout }) {
    return connection.setBright(intensity, transition, timeout);
  },
  setPowerState({ state, transition, timeout }) {
    return connection.setPower(state === "on", transition, timeout);
  },
  setColor({ color = [], transition, timeout }) {
    return connection.setRGB(new Color(...color), transition, timeout);
  },
});
