interface AllPromises {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: (...args: any[]) => Promise<any>;
}

/** All return types must be Promises (enforced by `extends AllPromises`). */
export interface IRendererToMain extends AllPromises {
  // TODO: replace with your renderer->main methods, implemented in
  // main/receive_ipc.ts.
  echo(val: string): Promise<string>;
  move(x: number, y: number): Promise<void>;
}

export type CallMainInternalType = <K extends keyof IRendererToMain & string>(
  name: K,
  ...args: Parameters<IRendererToMain[K]>
) => ReturnType<IRendererToMain[K]>;
