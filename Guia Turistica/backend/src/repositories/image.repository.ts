// src/repositories/image.repository.ts
import { Image } from '../models/entity/image.entity';

export class ImageRepository {
  async getAll() {
    return await Image.findAll();
  }

  async getById(image_id: number) {
    return await Image.findByPk(image_id);
  }

  async create(data: { url: string; activity_id: number }) {
    return await Image.create(data);
  }

  async update(image_id: number, data: { url?: string; activity_id?: number }) {
    const image = await Image.findByPk(image_id);
    if (!image) return null;
    return await image.update(data);
  }

  async delete(image_id: number) {
    const image = await Image.findByPk(image_id);
    if (!image) return null;
    await image.destroy();
    return image;
  }
}

export default new ImageRepository();
