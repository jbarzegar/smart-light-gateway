type UUID = string;

export type MappedDevice = {
  id: UUID;
  bridge_id: number;
  hw_id: string;
  name?: string;
};
