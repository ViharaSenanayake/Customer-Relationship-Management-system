/** 
 Global error handling middleware for the Express application.
 Captures unhandled errors and formats them into standardized JSON responses.
 **/
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', err.message);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
};
