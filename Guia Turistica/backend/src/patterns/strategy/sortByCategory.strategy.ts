// src/patterns/strategy/sortByCategory.strategy.ts
import { ISortStrategy } from './sortStrategy.interface';
import { Activity } from '../../models/entity/activity.entity';

// export class SortByCategory implements ISortStrategy {
//   sort(activities: Activity[]): Activity[] {
//     return activities.sort((a, b) => a.category.name.localeCompare(b.category.name));
//   }
// }

export class SortByCategory implements ISortStrategy {
  sort(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => {
      const categoryA = a.category?.name ?? '';
      const categoryB = b.category?.name ?? '';
      return categoryA.localeCompare(categoryB);
    });
  }
}
