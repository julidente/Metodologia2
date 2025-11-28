// src/patterns/strategy/strategy.mapper.ts
import { ISortStrategy } from './sortStrategy.interface';
import * as Strategies from './indexStrategy';

export const strategyMap: Record<string, new () => ISortStrategy> = {
  priceAsc: Strategies.SortByPriceAsc,
  priceDesc: Strategies.SortByPriceDesc,
  discountAsc: Strategies.SortByDiscountAsc,
  discountDesc: Strategies.SortByDiscountDesc,
  name: Strategies.SortByName,
  city: Strategies.SortByCity,
  province: Strategies.SortByProvince,
  category: Strategies.SortByCategory,
};
