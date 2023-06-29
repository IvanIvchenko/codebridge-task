import { Request } from 'express';

import { Dog } from '../models/dog.model';
import { DogFull, RequestBody, ResponseError } from '../utils/interfaces';

export class DogService {
  async create(data: Request<{}, {}, RequestBody>): Promise<DogFull> {
    const newDog = await Dog.create({
      name: data.body.name?.trim(),
      color: data.body.color?.trim(),
      tail_length: data.body.tail_length,
      weight: data.body.weight,
    });

    if (newDog) {
      return newDog;
    } else {
      const err: ResponseError = new Error(
        'Error occured while creating a dog',
      );
      err.statusCode = 500;
      throw err;
    }
  }

  async getRowNumber(): Promise<number> {
    const rowNumber = await Dog.count();
    return rowNumber;
  }

  async findAll(
    page: number,
    limit: number,
    order: string,
    attribute: string,
  ): Promise<DogFull[]> {
    const dog = await Dog.findAll({
      offset: (page - 1) * limit,
      limit: Number(limit),
      order: [[attribute, order.toUpperCase()]],
    });
    if (dog) {
      return dog;
    } else {
      const err: ResponseError = new Error(
        'Error occured while retreaving dogs',
      );
      err.statusCode = 500;
      throw err;
    }
  }

  async findOne(id: number): Promise<DogFull> {
    const dog = await Dog.findOne({
      where: { id: id },
    });

    if (dog) {
      return dog;
    } else {
      const err: ResponseError = new Error(`No dog with id=${id} was found`);
      err.statusCode = 400;
      throw err;
    }
  }

  async deleteOne(id: number): Promise<void> {
    const dog = await Dog.findByPk(id);

    if (!dog) {
      const err: ResponseError = new Error(`No dog with id=${id} was found`);
      err.statusCode = 400;
      throw err;
    }

    const dogDestr = await Dog.destroy({
      where: { id: id },
    });

    if (dogDestr !== 1) {
      const err: ResponseError = new Error(`"Error deleting dog with id=${id}`);
      err.statusCode = 409;
      throw err;
    }

    return;
  }

  async update(
    id: number,
    data: Request<{}, {}, RequestBody>,
  ): Promise<DogFull> {
    if (!data.body) {
      const err: ResponseError = new Error(
        'Dog data is required and was not provided',
      );
      err.statusCode = 500;
      throw err;
    }

    const dog = await Dog.findOne({ where: { id: id } });

    const updatedDog = await dog?.update({
      name: data.body.name || dog.name,
      color: data.body.color || dog.color,
      tail_length: data.body.tail_length || dog.tail_length,
      weight: data.body.weight || dog.weight,
    });

    if (updatedDog) {
      return updatedDog;
    } else {
      const err: ResponseError = new Error(
        'Error occured while updating a dog',
      );
      err.statusCode = 500;
      throw err;
    }
  }
}
