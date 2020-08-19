import Color from "color";

export const toRGB = (hex) => new Color(hex).rgb().toJSON();
