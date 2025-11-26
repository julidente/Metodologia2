// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import userService from '../services/user.service';

class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getById(Number(id));
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.create({ name, email, password });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.update(Number(id), req.body);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await userService.delete(Number(id));
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default new UserController();
