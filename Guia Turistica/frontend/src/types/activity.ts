
export interface ActivityImage {
  image_id: number;
  url: string;
  activity_id: number;
}

export interface Province {
  province_id: number;
  name: string;
}

export interface City {
  city_id: number;
  name: string;
  province?: Province | null;
}

export interface Category {
  category_id: number;
  name: string;
}

export interface Activity {
  activity_id: number;
  name: string;
  description?: string | null;
  price: number;
  discount?: number | null;
  location: string;
  city_id: number;
  category_id: number;
  city?: City | null;
  category?: Category | null;
  images?: ActivityImage[] | null;
}

export interface ActivityCreate {
  name: string;
  description?: string;
  price: number;
  discount?: number;
  location: string;
  city_id: number;
  category_id: number;
}

export type ActivityUpdate = Partial<ActivityCreate>;
