import { Request, Response } from 'express';
import ClassService from '../services/classes.service';

class ClassController {
  async getAllClasses(req: Request, res: Response) {
    try {
      const classes = await ClassService.findAll();
      return res.status(200).json(classes);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}

export default new ClassController();