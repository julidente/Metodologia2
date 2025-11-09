export interface Subscriber { update(event: string, data?: any): void | Promise<void>; }
export class ConsoleNotifier implements Subscriber {
  update(evt: string, data?: any) { console.log("[ConsoleNotifier]", evt, data); }
}