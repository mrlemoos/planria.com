import { Logger } from "tslog";

const channel = new Logger({
  prefix: [""],
  name: "",
  type: "pretty",
  hideLogPositionForProduction: true,
});

export const log = {
  error(message: string, ...args: unknown[]): void {
    channel.error(message, ...args);
  },
  warn(message: string, ...args: unknown[]): void {
    channel.warn(message, ...args);
  },
  info(message: string, ...args: unknown[]): void {
    channel.info(message, ...args);
  },
  debug(message: string, ...args: unknown[]): void {
    channel.debug(message, ...args);
  },
  trace(message: string, ...args: unknown[]): void {
    channel.trace(message, ...args);
  },
} as const;
