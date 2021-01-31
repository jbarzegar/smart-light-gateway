import fetch from 'node-fetch'
import { FnCreateBindings, FnMapBridgeInfo, XAction } from '../types'

export type HaBridgePingAPIResponse = {
  lights: Record<string, unknown>
  scenes: Record<string, unknown>
  groups: Record<string, unknown>
  schedules: Record<string, unknown>
  sensors: Record<string, unknown>
  rules: Record<string, unknown>
  config: {
    portalservices: boolean
    gateway: string
    mac: string
    swversion: string
    apiversion: string
    linkbutton: boolean
    ipaddress: string
    proxyport: number
    swupdate: {
      updatestate: number
      checkforupdate: boolean
      devicetypes: Record<string, unknown>
      text: string
      notify: boolean
      url: string
    }
    netmask: string
    name: string
    dhcp: boolean
    UTC: string
    proxyaddress: string
    localtime: string
    timezone: string
    zigbeechannel: string
    modelid: string
    bridgeid: string
    factorynew: boolean
    whitelist: Record<
      string,
      Record<'lastUseDate' | 'createDate' | 'name', string>
    >
  }
}

export const mapBridgeInfo: FnMapBridgeInfo<HaBridgePingAPIResponse> = data => ({
  bridgeId: data.config.bridgeid,
  gateway: data.config.gateway,
  ipAddress: data.config.ipaddress,
  macAddress: data.config.mac,
  modelId: data.config.modelid,
  name: data.config.name,
  time: {
    local: new Date(data.config.localtime),
    utc: new Date(data.config.UTC),
    zone: data.config.timezone,
  },
  version: {
    api: data.config.apiversion,
    software: data.config.swversion,
  },
})

type HaBridgeBindingDeps = { apiUrl: string }

export const bindings: FnCreateBindings<HaBridgeBindingDeps, XAction> = ({
  apiUrl,
}) => ({
  getInfo: () =>
    new Promise((resolve, reject) =>
      fetch(`${apiUrl}/api/ping`, {
        headers: { Accept: 'application/json' },
      })
        .then(resp => resp.json())
        .then(mapBridgeInfo)
        .then(info => resolve(info))
        .catch(e => reject(e))
    ),
  createDevice() {
    throw new Error('not implemented')
  },
  updateDevice() {
    throw new Error('not implemented')
  },
  deleteDevice() {
    throw new Error('not implemented')
  },
})
