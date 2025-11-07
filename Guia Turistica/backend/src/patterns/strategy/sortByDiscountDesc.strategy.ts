// src/patterns/strategy/sortByDiscountDesc.strategy.ts
import { ISortStrategy } from "./sortStrategy.interface";
import { Activity } from "../../models/entity/activity.entity";

export class SortByDiscountDesc implements ISortStrategy {
  sort(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  }
}