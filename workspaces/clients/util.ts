import { Color as LightColor } from 'yeelight-awesome'
import * as Color from 'color'

export const toRGB = (hex: string) => {
  // @ts-ignore
  const rgb: [number, number, number] = new Color(hex).rgb().toJSON().color

  return new LightColor(...rgb)
}
