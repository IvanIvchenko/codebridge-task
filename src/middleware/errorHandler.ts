import { NextFunction, Request, Response } from 'express';

import { ResponseError } from '../utils/interfaces';

export const errorHandler = async (error: ResponseError, _req: Request, res: Response, _next: NextFunction): Promise<void> => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  res.status(error.statusCode).send(error.message);
};
