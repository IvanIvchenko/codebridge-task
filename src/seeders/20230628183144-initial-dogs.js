'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Dogs',
      [
        {
          name: 'Neo',
          color: 'red&amber',
          tail_length: 22,
          weight: 32,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jessy',
          color: 'black&white',
          tail_length: 7,
          weight: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Dog', null, {});
  },
};
