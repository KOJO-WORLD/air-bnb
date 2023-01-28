'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, [
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
    const Op = Sequelize.Op;
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, null, {});
  }
};
