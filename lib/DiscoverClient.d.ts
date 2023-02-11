/**
 * TODO: Find out what <T> represented again
 */
export interface DiscoverClient<T> {
  discoverAllLights(): Promise<T[]>;
  cleanup(): Promise<void>;
}
