import { Subscriber } from "./notification.subscriber";
class NotificationPublisher {
  private subs: Subscriber[] = [];
  subscribe(s: Subscriber) { this.subs.push(s); }
  unsubscribe(s: Subscriber) { this.subs = this.subs.filter(x => x !== s); }
  notify(event: string, data?: any) { for (const s of this.subs) s.update(event, data); }
}
export const publisher = new NotificationPublisher();