// src/patterns/strategy/sortByCity.strategy.ts
import { ISortStrategy } from "./sortStrategy.interface";
import { Activity } from "../../models/entity/activity.entity";

// export class SortByCity implements ISortStrategy {
//   sort(activities: Activity[]): Activity[] {
//     return activities.sort((a, b) => a.city.name.localeCompare(b.city.name));
//   }
// }

export class SortByCity implements ISortStrategy {
  sort(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => {
      const cityA = a.city?.name ?? "";
      const cityB = b.city?.name ?? "";
      return cityA.localeCompare(cityB);
    });
  }
}