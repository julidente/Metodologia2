// src/controllers/activity.controller.ts

// TODO: SAQUE RATING DE ACTIVITY SACARLO DE LAS BD, Y TODA FUNCION QUE TENGA QUE VER CON ESO
import { Request, Response } from "express";
import activityService from "../services/activity.service";

class ActivityController {
  async getAll(req: Request, res: Response) {
    try {
      const activities = await activityService.getAll();
      res.json(activities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const activity = await activityService.getById(Number(id));
      res.json(activity);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const activity = await activityService.create(req.body);
      res.status(201).json(activity);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const activity = await activityService.update(Number(id), req.body);
      res.json(activity);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await activityService.delete(Number(id));
      res.json({ message: "Actividad eliminada correctamente" });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new ActivityController();
