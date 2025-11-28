// src/patterns/strategy/sortByPriceDesc.strategy.ts
import { ISortStrategy } from './sortStrategy.interface';
import { Activity } from '../../models/entity/activity.entity';

export class SortByPriceDesc implements ISortStrategy {
  sort(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => b.price - a.price);
  }
}
