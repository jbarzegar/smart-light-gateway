import fetch from 'node-fetch'

type HaBridgePingAPIResponse = {
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

type BridgeInfo = {
  name: string
  modelId: string
  bridgeId: string
  gateway: string
  macAddress: string
  ipAddress: string
  version: {
    api: string
    software: string
  }
  time: {
    zone: string
    utc: Date
    local: Date
  }
}

type FnMapBridgeInfo = (response: HaBridgePingAPIResponse) => BridgeInfo
const mapBridgeInfo: FnMapBridgeInfo = data => ({
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

type Bridge = {
  getInfo(): Promise<BridgeInfo>
}

type FnGetInfo = (url: string) => () => Promise<BridgeInfo>
const getInfo: FnGetInfo = url => () =>
  new Promise((resolve, reject) =>
    fetch(`${url}/api/ping`, {
      headers: { Accept: 'application/json' },
    })
      .then(resp => resp.json())
      .then((data: HaBridgePingAPIResponse) => mapBridgeInfo(data))
      .then(info => resolve(info))
      .catch(e => reject(e))
  )

type FnCreateBridgeSync = (url: string) => Bridge
export const createBridgeSync: FnCreateBridgeSync = url => {
  return {
    getInfo: getInfo(url),
  }
}
