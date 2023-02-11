type HaBridgeDeviceResponse = {
  id: string;
  uniqueid: string;
  name: string;
  /** Id generated by our bridge service, this id should be the same across services */
  mapId: string;
  mapType: string;
  offUrl: string;
  onUrl: string;
  dimUrl: string;
  colorUrl: string;
};

export type HaBridgePingAPIResponse = {
  lights: Record<string, unknown>;
  scenes: Record<string, unknown>;
  groups: Record<string, unknown>;
  schedules: Record<string, unknown>;
  sensors: Record<string, unknown>;
  rules: Record<string, unknown>;
  config: {
    portalservices: boolean;
    gateway: string;
    mac: string;
    swversion: string;
    apiversion: string;
    linkbutton: boolean;
    ipaddress: string;
    proxyport: number;
    swupdate: {
      updatestate: number;
      checkforupdate: boolean;
      devicetypes: Record<string, unknown>;
      text: string;
      notify: boolean;
      url: string;
    };
    netmask: string;
    name: string;
    dhcp: boolean;
    UTC: string;
    proxyaddress: string;
    localtime: string;
    timezone: string;
    zigbeechannel: string;
    modelid: string;
    bridgeid: string;
    factorynew: boolean;
    whitelist: Record<
      string,
      Record<"lastUseDate" | "createDate" | "name", string>
    >;
  };
};
