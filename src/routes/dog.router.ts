import { Router } from 'express';

import { DogController } from '../controllers/dog.controller';
import { dogCreateValidator } from '../middleware/dogCreateValidator';
import { queryValidator } from '../middleware/queryValidator';
import { DogService } from '../services/dog.service';
import { dogUpdateValidator } from '../middleware/dogUpdateValidator';
import { dogIdValidator } from '../middleware/dogIdValidator';

const dogController = new DogController(new DogService());

const dogRouter = Router();

// Create a New dog
dogRouter.post(
  '/dog',
  dogCreateValidator,
  dogController.create.bind(dogController),
);

// Retrieve ALL dogs
dogRouter.get(
  '/dogs',
  queryValidator,
  dogController.findAll.bind(dogController),
);

// Retrieve SINGLE dog w/ID
dogRouter.get(
  '/dog/:id',
  dogIdValidator,
  dogController.findOne.bind(dogController),
);

//Update dog w/ID
dogRouter.put(
  '/dog/:id',
  dogIdValidator,
  dogUpdateValidator,
  dogController.update.bind(dogController),
);

//Delete dog w/ID
dogRouter.delete(
  '/dog/:id',
  dogIdValidator,
  dogController.deleteOne.bind(dogController),
);

export { dogRouter };
