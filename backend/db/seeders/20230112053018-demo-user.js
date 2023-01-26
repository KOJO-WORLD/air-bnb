'use strict';

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'fake1@fake.com',
        username: 'Demo-lition',
        firstName: 'First',
        lastName: 'Demo',
        hashedPassword: bcrypt.hashSync('Password')
      },
      {
        id: 2,
        email: 'fake2@fake.com',
        username: 'FakeUser1',
        firstName: 'Second',
        lastName: 'Fake',
        hashedPassword: bcrypt.hashSync('Password2')
      },
      {
        id: 3,
        email: 'fake3@fake.com',
        username: 'FakeUser2',
        firstName: 'Third',
        lastName: 'Imposter',
        hashedPassword: bcrypt.hashSync('Password3')
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
