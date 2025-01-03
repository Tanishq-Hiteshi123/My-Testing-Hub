import * as express from 'express';
import type { Request } from 'express';
import { User } from '../models/user.model';
import { JWTPayload } from '../middleware/authentication';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; userRole: string };
    }
  }
}
