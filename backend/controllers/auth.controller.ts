/**
 * @file auth.controller.ts
 * @description Handles user authentication logic including login and registration requests.
 * Connects Express routes to the authentication service and database.
 */
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { signToken } from '../services/auth.service';
import { prisma } from '../prisma/db/client';

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  (async () => {
    const normalized = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalized } });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = signToken({ id: user.id, email: user.email, name: user.name });

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  })().catch((err) => {
    console.error('Login failed', err);
    res.status(500).json({ message: 'Login failed' });
  });
};

export const getMe = (req: Request, res: Response): void => {
  const authUser = (req as any).user;
  (async () => {
    const user = await prisma.user.findUnique({
      where: { id: authUser?.id },
      select: { id: true, email: true, name: true },
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  })().catch((err) => {
    console.error('Get me failed', err);
    res.status(500).json({ message: 'Failed to fetch user' });
  });
};
