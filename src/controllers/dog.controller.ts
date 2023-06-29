import { NextFunction, Request, Response } from 'express';

import { DogService } from '../services/dog.service';
import { RequestBody, RequestParams, RequestQuery } from '../utils/interfaces';

export class DogController {
  private dogService: DogService;

  constructor(dogService: DogService) {
    this.dogService = dogService;
  }

  async create(
    req: Request<{}, {}, RequestBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.status(200).json(await this.dogService.create(req));
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error while creating dog:', err.message);
        next(err);
      }
      console.error('Unknown error occured.');
      next(err);
    }
  }

  async findAll(
    req: Request<{}, {}, {}, RequestQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const rowNumber = await this.dogService.getRowNumber();
      const foundDogs = await this.dogService.findAll(
        req.query.page,
        req.query.limit,
        req.query.order,
        req.query.attribute,
      );
      res
        .status(200)
        .set({
          'Access-Control-Expose-Headers': '*',
          'X-total-count': rowNumber,
        })
        .json(foundDogs);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error while retreaving dogs:', err.message);
        next(err);
      }
      console.error('Unknown error occured.');
      next(err);
    }
  }

  async findOne(
    req: Request<RequestParams, {}, {}>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.status(200).json(await this.dogService.findOne(req.params.id));
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error while retreaving a dog:', err.message);
        next(err);
      }
      console.error('Unknown error occured.');
      next(err);
    }
  }

  async update(
    req: Request<RequestParams, {}, RequestBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.status(200).json(await this.dogService.update(req.params.id, req));
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error while updating a dog:', err.message);
        next(err);
      }
      console.error('Unknown error occured.');
      next(err);
    }
  }

  async deleteOne(
    req: Request<RequestParams, {}, {}>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      res.status(204).json(await this.dogService.deleteOne(req.params.id));
    } catch (err) {
      if (err instanceof Error) {
        console.error(
          `Error while deleting dog with id=${req.params.id}:`,
          err.message,
        );
        next(err);
      }
      console.error('Unknown error occured.');
      next(err);
    }
  }
}
