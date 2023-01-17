'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");


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
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'fake1@fake.com',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('Password')
      },
      {
        email: 'fake2@fake.com',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('Password2')
      },
      {
        email: 'fake3@fake.com',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('Password3')
      }
    ], {})

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
