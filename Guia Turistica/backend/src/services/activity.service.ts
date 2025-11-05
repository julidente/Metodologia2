// src/services/activity.service.ts
import activityRepository from "../repositories/activity.repository";

export class ActivityService {
  async getAll() {
    return await activityRepository.getAll();
  }

  async getById(activity_id: number) {
    const activity = await activityRepository.getById(activity_id);
    if (!activity) throw new Error("Actividad no encontrada");
    return activity;
  }

  async create(data: any) {
    // Zod ya valida campos obligatorios
    return await activityRepository.create(data);
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

