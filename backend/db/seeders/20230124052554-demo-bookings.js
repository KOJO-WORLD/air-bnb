'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '11-28-23',
        endDate: '11-30-23'
      },
      {
        spotId: 1,
        userId: 1,
        startDate: '12-25-23',
        endDate: '1-02-24'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '11-28-23',
        endDate: '11-30-23'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '12-25-23',
        endDate: '1-02-24'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2-10-23',
        endDate: '2-15-23'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '6-4-23',
        endDate: '6-8-23'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '11-28-23',
        endDate: '11-30-23'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '11-28-23',
        endDate: '11-30-23'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '12-25-23',
        endDate: '1-02-24'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2-10-23',
        endDate: '2-15-23'
      },
    ], {})
  },


  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Bookings', {
      userId: {[Op.in]: [1, 2, 3, 4]}
    }, {});
  }
};
