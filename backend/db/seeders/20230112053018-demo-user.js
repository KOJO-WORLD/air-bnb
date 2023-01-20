'use strict';

// /** @type {import('sequelize-cli').Migration} */

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
    // options.tableName = 'Users';
    await queryInterface.bulkInsert('Users', [
      {
        email: 'fake1@fake.com',
        username: 'Demo-lition',
        firstName: 'First',
        lastName: 'Demo',
        hashedPassword: bcrypt.hashSync('Password')
      },
      {
        email: 'fake2@fake.com',
        username: 'FakeUser1',
        firstName: 'Second',
        lastName: 'Fake',
        hashedPassword: bcrypt.hashSync('Password2')
      },
      {
        email: 'fake3@fake.com',
        username: 'FakeUser2',
        firstName: 'Third',
        lastName: 'Imposter',
        hashedPassword: bcrypt.hashSync('Password3')
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
    // options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
