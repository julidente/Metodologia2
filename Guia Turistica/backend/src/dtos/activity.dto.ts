// src/dtos/activity.dto.ts
import { IActivity } from '../models/activity.model';

export interface CreateActivityDTO extends Omit<IActivity, 'activity_id'> {}
export interface UpdateActivityDTO extends Partial<Omit<IActivity, 'activity_id'>> {}
