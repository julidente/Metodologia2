// src/repositories/activity.repository.ts
/* import { Activity } from "../models/entity/activity.entity";

export class ActivityRepository {
  async getAll() {
    return await Activity.findAll({ include: ["city", "category", "images", "subscriptions"] });
  }

  async getById(activity_id: number) {
    return await Activity.findByPk(activity_id, { include: ["city", "category", "images", "subscriptions"] });
  }

  async create(data: any) {
    return await Activity.create(data);
  }

  async update(activity_id: number, data: any) {
    const activity = await Activity.findByPk(activity_id);
    if (!activity) return null;
    return await activity.update(data);
  }

  async delete(activity_id: number) {
    const activity = await Activity.findByPk(activity_id);
    if (!activity) return null;
    await activity.destroy();
    return true;
  }
}

export default new ActivityRepository(); */

// src/repositories/activity.repository.ts
import { Activity, City, Category, Image, Province } from "../models/entity";
import { CreateActivityDTO, UpdateActivityDTO } from "../dtos/activity.dto";

export class ActivityRepository {
  // async getAll(): Promise<Activity[]> {
  //   return await Activity.findAll({
  //     include: [
  //       { model: City, as: "city" },
  //       { model: Category, as: "category" },
  //       { model: Image, as: "images" },
  //     ],
  //   });
  // }

  // para usar el sorted by province
  async getAll(): Promise<Activity[]> {
  return await Activity.findAll({
    include: [
      {
        model: City,
        as: "city",
        include: [
          { model: Province, as: "province" }, // agregamos province aca
        ],
      },
      { model: Category, as: "category" },
      { model: Image, as: "images" },
    ],
  });
}

  async getById(activity_id: number): Promise<Activity | null> {
    return await Activity.findByPk(activity_id, {
      include: [
        { model: City, as: "city" },
        { model: Category, as: "category" },
        { model: Image, as: "images" },
      ],
    });
  }

  async create(data: CreateActivityDTO): Promise<Activity> {
    return await Activity.create(data);
  }

  async update(activity_id: number, data: UpdateActivityDTO): Promise<Activity | null> {
    const activity = await Activity.findByPk(activity_id);
    if (!activity) return null;
    return await activity.update(data);
  }

  async delete(activity_id: number): Promise<boolean> {
    const activity = await Activity.findByPk(activity_id);
    if (!activity) return false;
    await activity.destroy();
    return true;
  }
}

export default new ActivityRepository();
