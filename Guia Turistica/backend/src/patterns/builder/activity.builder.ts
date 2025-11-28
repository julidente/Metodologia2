// src/patterns/builder/activity.builder.ts
import { CreateActivityDTO } from '../../dtos/activity.dto';

export class ActivityBuilder {
  private data: Partial<CreateActivityDTO> = {};
  private image_url?: string; // campo opcional para la imagen

  setName(name: string) {
    this.data.name = name;
    return this;
  }

  setDescription(description: string) {
    this.data.description = description;
    return this;
  }

  setPrice(price: number) {
    this.data.price = price;
    return this;
  }

  setDiscount(discount: number) {
    this.data.discount = discount;
    return this;
  }

  setLocation(location: string) {
    this.data.location = location;
    return this;
  }

  setCityId(city_id: number) {
    this.data.city_id = city_id;
    return this;
  }

  setCategoryId(category_id: number) {
    this.data.category_id = category_id;
    return this;
  }

  setImage(url: string) {
    this.image_url = url;
    return this;
  }

  getImageUrl(): string {
    // Si no se setea imagen, devuelve placeholder por defecto
    return this.image_url || '/images/activities/placeholder.jpeg';
  }

  /**
   * Devuelve los datos tal como están, aunque estén incompletos.
   */
  // no creo que sea necesario
  //   buildPartial(): Partial<CreateActivityDTO> {
  //     return { ...this.data };
  //   }

  /**
   * Devuelve el objeto listo para crear una Activity completa.
   * No valida (ya lo hace el middleware).
   */
  build(): CreateActivityDTO {
    return this.data as CreateActivityDTO;
  }
}
