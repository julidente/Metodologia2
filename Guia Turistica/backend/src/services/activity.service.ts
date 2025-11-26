// src/services/activity.service.ts
import activityRepository from '../repositories/activity.repository';
// para usar el builder
import { ActivityBuilder } from '../patterns/builder/activity.builder';
import { CreateActivityDTO } from '../dtos/activity.dto';

// para usar el strategy
import { Activity } from '../models/entity/activity.entity';

import { strategyMap } from '../patterns/strategy/strategy.mapper';

import imageRepository from '../repositories/image.repository';

//import { ISortStrategy } from '../patterns/strategy/sortStrategy.interface';
//import {SortByMultiple} from '../patterns/strategy/sortByMultiple.strategy';

export class ActivityService {
  async getAll() {
    return await activityRepository.getAll();
  }

  // con el mapper aparte, sin combinaciones (sin sort secuencial)

  async getAllSorted(sortKey?: string): Promise<Activity[]> {
    const activities = await activityRepository.getAll();

    if (!sortKey) return activities;

    const StrategyClass = strategyMap[sortKey];
    if (!StrategyClass) return activities; // Si no existe la strategy, devolvemos sin ordenar

    const strategy = new StrategyClass();
    return strategy.sort(activities);
  }

  // con el mapper aparte, con combinaciones (sort secuencial)
  // async getAllSorted(sortKeys?: string[]): Promise<Activity[]> {
  //   const activities = await activityRepository.getAll();

  //   if (!sortKeys || sortKeys.length === 0) return activities;

  //   let sorted = [...activities]; // hacemos copia para no mutar el original

  //   for (const key of sortKeys) {
  //     const StrategyClass = strategyMap[key];
  //     if (!StrategyClass) continue; // ignorar keys inválidas
  //     const strategy = new StrategyClass();
  //     sorted = strategy.sort(sorted);
  //   }

  //   return sorted;
  // }

  async getById(activity_id: number) {
    const activity = await activityRepository.getById(activity_id);
    if (!activity) throw new Error('Actividad no encontrada');
    return activity;
  }

  //crear con un builder
  /* async create(data: CreateActivityDTO) {
    // Construimos la actividad con el Builder
    const builder = new ActivityBuilder()
      .setName(data.name)
      .setPrice(data.price)
      .setLocation(data.location)
      .setCityId(data.city_id)
      .setCategoryId(data.category_id);

    if (data.description) builder.setDescription(data.description);
    if (data.discount !== undefined) builder.setDiscount(data.discount);

    // No validamos, ya lo hizo el middleware con Zod
    const activityData = builder.build();

    // Creamos en DB
    return await activityRepository.create(activityData);
  } */

  // crear con un builder (tiene imagenes)
  async create(data: CreateActivityDTO) {
    const builder = new ActivityBuilder()
      .setName(data.name)
      .setPrice(data.price)
      .setLocation(data.location)
      .setCityId(data.city_id)
      .setCategoryId(data.category_id);

    if (data.description) builder.setDescription(data.description);
    if (data.discount !== undefined) builder.setDiscount(data.discount);

    // Setear imagen si viene en el POST
    if ((data as any).image_url) {
      builder.setImage((data as any).image_url);
    }

    const activityData = builder.build();

    // Crear la actividad
    const activity = await activityRepository.create(activityData);

    // Crear la imagen asociada (si no hay, usa placeholder)
    await imageRepository.create({
      url: builder.getImageUrl(),
      activity_id: activity.activity_id,
    });

    return activity;
  }

  async update(activity_id: number, data: any) {
    const updated = await activityRepository.update(activity_id, data);
    if (!updated) throw new Error('Actividad no encontrada');
    return updated;
  }

  async delete(activity_id: number) {
    const deleted = await activityRepository.delete(activity_id);
    if (!deleted) throw new Error('Actividad no encontrada');
    return deleted;
  }
}

export default new ActivityService();
