import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

interface LoginBody {
  email: string;
  password: string;
}

class AuthController {
  async login(req: Request<{}, {}, LoginBody>, res: Response) {
    try {
      const { email, password } = req.body;

      // Validar credenciales del usuario (admin)
      const user = await AuthService.validateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = await AuthService.generateToken(user);

      // Enviar respuesta
      return res.status(200).json({
        message: 'Login exitoso',
        token,
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      console.error(' Error en login:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}

export default new AuthController();
