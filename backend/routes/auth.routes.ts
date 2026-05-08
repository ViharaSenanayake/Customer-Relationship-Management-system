/**
 Defines Express routes for authentication endpoints
 Maps API routes to their respective controller functions.
 **/
import { Router } from 'express';
import { login, getMe } from '../controllers/auth.controller';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post('/login', login);
router.get('/me', authenticate, getMe);

export default router;
