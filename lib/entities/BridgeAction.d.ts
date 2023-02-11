/** Defines an action that can be sent from the bridge to our api */
export type BridgeAction<N extends string, P> = P extends never
  ? { name: N }
  : { name: N; payload: P };
