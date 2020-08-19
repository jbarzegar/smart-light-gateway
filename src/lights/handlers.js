import { toRGB } from "../utils";

const lightConf = { transition: "smooth", timeout: 400 };

export const setupHandlers = (getActions) => ({
  handlePowerAction(action, body) {
    const hasColor = body?.color;

    return async (light) => {
      const { setPowerState, setColor } = getActions(light);
      await setPowerState({ state: action, ...lightConf });

      if (hasColor) {
        await setColor({
          color: toRGB(`#${body.color}`).color,
          ...lightConf,
        });
      }

      return Promise.resolve();
    };
  },

  handleDim(intensity) {
    return async (light) => {
      try {
        const { setBrightness } = getActions(light);
        await setBrightness({
          intensity: parseInt(intensity),
          ...lightConf,
        });
      } catch (e) {
        throw e;
      }
    };
  },

  handleColor(light) {
    const { setColor } = getActions(light);
    return setColor({
      color: toRGB(`#${req.body.color}`).color,
      ...lightConf,
    });
  },
});
