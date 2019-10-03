declare namespace Module {
  export function all(assets: { [key: string]: string }[]): any;
}

declare module 'load-asset' {
  export = Module;
}
