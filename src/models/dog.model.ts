import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../connector';

class Dog extends Model {
  public id!: number;
  public name!: string;
  public color!: string;
  public tail_length!: number;
  public weight!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Dog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    tail_length: {
      type: DataTypes.FLOAT,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: 'Dogs',
  },
);

export { Dog };
