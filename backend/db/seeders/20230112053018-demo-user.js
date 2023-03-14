'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.bulkInsert(options, [
      {
        email: 'demo@demo.com',
        username: 'DemoUser',
        firstName: 'DemoFirst',
        lastName: 'DemoLast',
        hashedPassword: bcrypt.hashSync('DemoPassword')
      },
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
    const Op = Sequelize.Op;
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, null, {});
  }
};
