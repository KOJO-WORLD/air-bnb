'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        // userId: ,
        startDate: '11-28-23',
        endDate: '11-30-23'
      },
      {
        spotId: 1,
        // userId: ,
        startDate: '12-25-23',
        endDate: '1-02-24'
      },
      {
        spotId: 2,
        // userId: ,
        startDate: '11-28-23',
        endDate: '11-30-23'
      },
      {
        spotId: 2,
        // userId: ,
        startDate: '12-25-23',
        endDate: '1-02-24'
      },
      {
        spotId: 2,
        // userId: ,
        startDate: '2-10-23',
        endDate: '2-15-23'
      },
      {
        spotId: 2,
        // userId: ,
        startDate: '6-4-23',
        endDate: '6-8-23'
      },
      {
        spotId: 3,
        // userId: ,
        startDate: '11-28-23',
        endDate: '11-30-23'
      },
      {
        spotId: 4,
        // userId: ,
        startDate: '11-28-23',
        endDate: '11-30-23'
      },
      {
        spotId: 4,
        // userId: ,
        startDate: '12-25-23',
        endDate: '1-02-24'
      },
      {
        spotId: 4,
        // userId: ,
        startDate: '2-10-23',
        endDate: '2-15-23'
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
