import { NextFunction, Request, Response } from 'express';

import { dogExistsCheck } from '../utils/dogExistsCheck.util';
import { RequestBody, ResponseError } from '../utils/interfaces';
import { isPositiveFloat } from '../utils/isPositiveFloat.util';

export const dogCreateValidator = async (
  req: Request<{}, {}, RequestBody>,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (
      !req.body.name ||
      !req.body.color ||
      !req.body.tail_length ||
      !req.body.weight
    ) {
      const err: ResponseError = new Error('Dog data is incomplete');
      err.statusCode = 400;
      throw err;
    }
    if (!/^[a-zA-Z0-9& ]+$/.test(req.body.name)) {
      const err: ResponseError = new Error('Dog name is invalid');
      err.statusCode = 400;
      throw err;
    }
    if (!/^[a-zA-Z0-9& ]+$/.test(req.body.color)) {
      const err: ResponseError = new Error('Dog color is invalid');
      err.statusCode = 400;
      throw err;
    }
    if (!isPositiveFloat(req.body.tail_length) || req.body.tail_length > 500) {
      const err: ResponseError = new Error('Dog tail length is invalid');
      err.statusCode = 400;
      throw err;
    }
    if (!isPositiveFloat(req.body.weight) || req.body.weight > 143) {
      const err: ResponseError = new Error('Dog weight is invalid');
      err.statusCode = 400;
      throw err;
    }
    const dogCount = await dogExistsCheck(req.body.name);
    if (dogCount > 0) {
      req.body.name = req.body.name.trim() + `(${dogCount})`;
    }
    next();
  } catch (error) {
    next(error);
  }
};
