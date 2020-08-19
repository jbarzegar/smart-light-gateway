export const useActions = (adapter) => (light) => {
  const _ = adapter(light);
  return {
    setBrightness(...props) {
      return _.setBrightness(...props);
    },
    setPowerState(...args) {
      return _.setPowerState(...args);
    },
    setColor({ color = [], ...rest }) {
      return _.setRGB({ color, ...rest });
    },
  };
};
