// src/patterns/strategy/sortByProvince.strategy.ts
import { ISortStrategy } from "./sortStrategy.interface";
import { Activity } from "../../models/entity/activity.entity";

// export class SortByProvince implements ISortStrategy {
//   sort(activities: Activity[]): Activity[] {
//     return activities.sort(
//       (a, b) => a.city.province.name.localeCompare(b.city.province.name)
//     );
//   }
// }

export class SortByProvince implements ISortStrategy {
  sort(activities: Activity[]): Activity[] {
    return activities.sort((a, b) => {
      const provinceA = a.city?.province?.name ?? "";
      const provinceB = b.city?.province?.name ?? "";
      return provinceA.localeCompare(provinceB);
    });
  }
}
