import type { Socket } from 'net';

declare module 'messenger' {
  function createListener(port: string | number): Listener;
  function createSpeaker(...ports: string[] | number[]): Speaker;
}

declare class Listener {
  constructor(address: string | number);
  startServer(): void;
  onError(errorFn: (e: any) => void): void;
  on<T>(subject: string, callback: (msg: unknown, data: T) => void): void;
}

declare class Speaker {
  constructor(addresses: string[] | number[]);
  sockets: Socket[];
  send<T>(subject: string, data: T): void;
  shout<T>(subject: string, data: T): void;
}
