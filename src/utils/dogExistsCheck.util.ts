import { Op } from 'sequelize';

import { Dog } from '../models/dog.model';

export const dogExistsCheck = async (name: string): Promise<number> => {
  const dogName = `${name}(%`;
  const dog = await Dog.findAll({
    where: {
      name: {
        [Op.or]: { [Op.like]: dogName, [Op.eq]: name },
      },
    },
  });
  return dog.length;
};
