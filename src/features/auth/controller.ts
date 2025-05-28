import { Request, Response } from 'express';
import { AuthService } from './service';
import { LoginInput, SignUpInput, User } from './model';
import { UserExistsError, InvalidCredentialsError, AuthError } from './errors';
import jwt from 'jsonwebtoken';

export class AuthController {
  constructor(private readonly service: AuthService) {}

  getService = () => this.service;

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Login successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoginResponse'
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: Unauthorized - Invalid email or password
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  login = async (req: Request, res: Response) => {
    try {
      const { email, password }: LoginInput = req.body;

      const result = await this.service.login(email, password);

      console.log('Successfully logged in user: ', result.user.id);
      res.json(result);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }
      console.error('Unexpected error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * @swagger
   * /auth/signup:
   *   post:
   *     summary: Register a new user
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SignupRequest'
   *     responses:
   *       201:
   *         description: User successfully registered
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SignupResponse'
   *       409:
   *         description: Unable to create account
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  signup = async (req: Request, res: Response) => {
    try {
      const { email, password }: SignUpInput = req.body;

      const { user, token } = await this.service.signup({ email, password });
      console.log('Successfully signed up user: ', user.id);
      res.status(201).json({ user, token });
    } catch (error) {
      if (error instanceof UserExistsError) {
        console.error('Error during signup, user already exists');
        res.status(409).json({ error: 'Unable to create account' });
        return;
      }
      console.error('Unexpected error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     summary: Logout user
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       204:
   *         description: Logout successful
   *       401:
   *         description: Unauthorized - Invalid or missing token
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  logout = async (_req: Request, res: Response) => {
    try {
      await this.service.logout();
      console.log('Successfully logged out user');
      res.status(204).send();
    } catch (error) {
      console.error('Error during logout: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
