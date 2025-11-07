// src/services/activity.service.ts
import activityRepository from "../repositories/activity.repository";
// para usar el builder
import { ActivityBuilder } from "../patterns/builder/activity.builder";
import { CreateActivityDTO } from "../dtos/activity.dto";

// para usar el strategy
//import * as Strategies from "../patterns/strategy/indexStrategy"; // importa todas las strategies desde el index
import { Activity } from "../models/entity/activity.entity"

import { strategyMap } from "../patterns/strategy/strategy.mapper";

export class ActivityService {
  async getAll() {
    return await activityRepository.getAll();
  }

  // sin el mapper aparte

  // async getAllSorted(sortKey?: string): Promise<Activity[]> {
  //   const activities = await activityRepository.getAll();

  //   if (!sortKey) return activities;

  //   // mapper dinámico
  //   const strategyMap: Record<string, any> = {
  //     priceAsc: Strategies.SortByPriceAsc,
  //     priceDesc: Strategies.SortByPriceDesc,
  //     discountAsc: Strategies.SortByDiscountAsc,
  //     discountDesc: Strategies.SortByDiscountDesc,
  //     name: Strategies.SortByName,
  //     city: Strategies.SortByCity,
  //     province: Strategies.SortByProvince,
  //     category: Strategies.SortByCategory,
  //   };

  //   const StrategyClass = strategyMap[sortKey];
  //   if (!StrategyClass) return activities; // si no existe la strategy, devolvemos sin ordenar

  //   const strategy = new StrategyClass();
  //   return strategy.sort(activities);
  // }

  // con el mapper aparte, sin combinaciones (sin sort secuencial)

  /* async getAllSorted(sortKey?: string): Promise<Activity[]> {
    const activities = await activityRepository.getAll();

    if (!sortKey) return activities;

    const StrategyClass = strategyMap[sortKey];
    if (!StrategyClass) return activities; // Si no existe la strategy, devolvemos sin ordenar

    const strategy = new StrategyClass();
    return strategy.sort(activities);
  } */

  // con el mapper aparte, con combinaciones (sort secuencial)
  async getAllSorted(sortKeys?: string[]): Promise<Activity[]> {
    const activities = await activityRepository.getAll();

    if (!sortKeys || sortKeys.length === 0) return activities;

    let sorted = [...activities]; // hacemos copia para no mutar el original

    for (const key of sortKeys) {
      const StrategyClass = strategyMap[key];
      if (!StrategyClass) continue; // ignorar keys inválidas
      const strategy = new StrategyClass();
      sorted = strategy.sort(sorted);
    }

    return sorted;
  }

  async getById(activity_id: number) {
    const activity = await activityRepository.getById(activity_id);
    if (!activity) throw new Error("Actividad no encontrada");
    return activity;
  }

  /* async create(data: any) {
    // Zod ya valida campos obligatorios
    return await activityRepository.create(data);
  } */

  //crear con un builder
  async create(data: CreateActivityDTO) {
    // Construimos la actividad con el Builder
    const builder = new ActivityBuilder()
      .setName(data.name)
      .setPrice(data.price)
      .setLocation(data.location)
      .setCityId(data.city_id)
      .setCategoryId(data.category_id);

    if (data.description) builder.setDescription(data.description);
    if (data.discount !== undefined) builder.setDiscount(data.discount);

    // No validamos, ya lo hizo el middleware
    const activityData = builder.build();

    // Creamos en DB
    return await activityRepository.create(activityData);
  }

  async update(activity_id: number, data: any) {
    const updated = await activityRepository.update(activity_id, data);
    if (!updated) throw new Error("Actividad no encontrada");
    return updated;
  }

  async delete(activity_id: number) {
    const deleted = await activityRepository.delete(activity_id);
    if (!deleted) throw new Error("Actividad no encontrada");
    return deleted;
  }
}

export default new ActivityService();

