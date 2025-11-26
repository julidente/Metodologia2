// src/controllers/city.controller.ts
// con el singleton
import { Request, Response } from 'express';
import cityService from '../services/city.service';

class CityController {
  async getAll(req: Request, res: Response) {
    try {
      const cities = await cityService.getAll();
      res.json(cities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const city = await cityService.getById(Number(id));
      res.json(city);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, province_id } = req.body;
      const city = await cityService.create({ name, province_id });
      res.status(201).json(city);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const city = await cityService.update(Number(id), req.body);
      res.json(city);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await cityService.delete(Number(id));
      res.json({ message: 'Ciudad eliminada correctamente' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new CityController();
