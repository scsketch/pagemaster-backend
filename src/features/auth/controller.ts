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
   *       401:
   *         description: Invalid credentials
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

      console.log('Successfully logged in user: ', result.user.userId);
      res.json(result);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        res.status(401).json({ error: 'Unauthorized' });
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
   *       400:
   *         description: Invalid input or user already exists
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
      console.log('Successfully signed up user: ', user.userId);
      res.status(201).json({ user, token });
    } catch (error) {
      if (error instanceof UserExistsError) {
        console.error('Error during signup, user already exists');
        res.status(400).json({ error: 'Invalid request' });
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
   *       200:
   *         description: Logout successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Successfully logged out
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
      res.status(200).json({ message: 'Successfully logged out' });
    } catch (error) {
      console.error('Error during logout: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}
