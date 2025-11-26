// src/tests/unit/auth.test.ts
import request from 'supertest';
import app from '../../test-app';
import AuthService from '../../services/auth.service';

jest.mock('../../services/auth.service'); // Mock global de AuthService

describe('POST /auth/login', () => {
  const mockUser = {
    user_id: 1,
    name: 'Test User',
    email: 'test@test.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debe hacer login exitoso y devolver token', async () => {
    (AuthService.validateUser as jest.Mock).mockResolvedValue(mockUser);
    (AuthService.generateToken as jest.Mock).mockResolvedValue('mocked-jwt-token');

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login exitoso');
    expect(res.body.token).toBe('mocked-jwt-token');
    expect(res.body.user).toEqual(mockUser);
  });

  test('Debe retornar 401 si las credenciales son inválidas', async () => {
    (AuthService.validateUser as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong@test.com', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Credenciales inválidas');
  });

  test('Debe retornar 500 si ocurre un error interno', async () => {
    (AuthService.validateUser as jest.Mock).mockRejectedValue(new Error('DB error'));

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Error interno del servidor'); // Coincide con tu controller
  });
});
