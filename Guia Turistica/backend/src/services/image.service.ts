// src/services/image.service.ts
// usando url de la imagen en BD
import imageRepository from '../repositories/image.repository';

export class ImageService {
  async getAll() {
    return await imageRepository.getAll();
  }

  async getById(image_id: number) {
    const image = await imageRepository.getById(image_id);
    if (!image) throw new Error('Imagen no encontrada');
    return image;
  }

  async create(data: { url: string; activity_id: number }) {
    return await imageRepository.create(data);
  }

  async update(image_id: number, data: { url?: string; activity_id?: number }) {
    const image = await imageRepository.update(image_id, data);
    if (!image) throw new Error('Imagen no encontrada');
    return image;
  }

  async delete(image_id: number) {
    const deleted = await imageRepository.delete(image_id);
    if (!deleted) throw new Error('Imagen no encontrada');
    return deleted;
  }
}

export default new ImageService();

// src/services/image.service.ts
// usando dinary config
// import { Image } from '../models/entity/image.entity';
// import cloudinary from '../config/cloudinary';

// class ImageService {
//   async getAll() {
//     return await Image.findAll();
//   }

//   async getById(image_id: number) {
//     const image = await Image.findByPk(image_id);
//     if (!image) throw new Error('Imagen no encontrada');
//     return image;
//   }

//   async create(filePath: string, activity_id: number) {
//     // Subir a Cloudinary
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: 'activities',
//     });

//     // Guardar URL en la DB
//     const image = await Image.create({
//       url: result.secure_url,
//       activity_id,
//     });

//     return image;
//   }

//   async update(image_id: number, data: { url?: string; activity_id?: number }) {
//     const image = await Image.findByPk(image_id);
//     if (!image) throw new Error('Imagen no encontrada');
//     return await image.update(data);
//   }

//   async delete(image_id: number) {
//     const image = await Image.findByPk(image_id);
//     if (!image) throw new Error('Imagen no encontrada');

//     // Opcional: eliminar de Cloudinary si guardaste el public_id
//     await image.destroy();
//     return image;
//   }
// }

// export default new ImageService();
