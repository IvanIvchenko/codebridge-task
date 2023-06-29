import { NextFunction, Request, Response } from 'express';

import { RequestQuery } from '../utils/interfaces';
import { isPositiveInteger } from '../utils/isPositiveInteger.util';

export const queryValidator = async (
  req: Request<{}, {}, {}, RequestQuery>,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!isPositiveInteger(req.query.page)) {
    req.query.page = 1;
  }
  if (!isPositiveInteger(req.query.limit)) {
    req.query.limit = 10;
  }
  if (!['ASC', 'DESC'].includes(req.query.order.toUpperCase())) {
    req.query.order = 'DESC';
  }
  if (
    !['weight', 'name', 'color', 'tail_length'].includes(req.query.attribute)
  ) {
    req.query.attribute = 'updatedAt';
  }
  next();
};
