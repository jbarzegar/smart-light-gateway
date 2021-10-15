type BridgeIDRecord = { id: number; hwID: string; name: string };

type BridgeSyncParams = {
  newDevices: Array<{ id: string; name: string }>;
  removedDevices: Array<{ id: string; bridgeId: number }>;
};
type BridgeSyncOutput = { added: BridgeIDRecord[]; removed: BridgeIDRecord[] };

interface BridgeActions {
  /** triggers the bridge to sync  */
  sync(params: BridgeSyncParams): Promise<BridgeSyncOutput>;
}
