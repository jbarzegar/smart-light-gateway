export interface DiscoverClient<T> {
  discoverAllLights(): Promise<T[]>;
  cleanup(): Promise<void>;
}
type Cleanup = () => Promise<void>;

export type CreateDiscoverClient<T> = () => [DiscoverClient<T>, Cleanup];
