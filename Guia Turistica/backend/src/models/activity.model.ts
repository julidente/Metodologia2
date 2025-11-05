// src/models/activity.model.ts
export interface IActivity {
  activity_id: number;
  name: string;
  description?: string;
  city_id: number;
  category_id: number;
  // se puede agregar más campos como fecha, precio, etc.
}
