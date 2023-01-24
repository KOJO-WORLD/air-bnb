'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 3,
        spotId: 2,
        review: 'Very nice house. Big backyard.',
        stars: 5
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Test Review2',
        stars: 3
      },
      {
        userId: 1,
        spotId: 2,
        review: 'Test Review2',
        stars: 3.5
      },
      {
        userId: 2,
        spotId: 4,
        review: 'Test Review2',
        stars: 2
      },
      {
        userId: 1,
        spotId: 2,
        review: 'Test Review3',
        stars: 5
      },
      {
        userId: 2,
        spotId: 1,
        review: 'Nice front staff',
        stars: 4
      },
      {
        userId: 3,
        spotId: 1,
        review: 'Test review1',
        stars: 2,
      },
      {
        userId: 2,
        spotId: 1,
        review: 'Test review4',
        stars: 2,
      },
      {
        userId: 1,
        spotId: 3,
        review: 'Fun ride. Kinda dirty',
        stars: 3,
      },
      {
        userId: 3,
        spotId: 3,
        review: 'Test Review5',
        stars: 1,
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
