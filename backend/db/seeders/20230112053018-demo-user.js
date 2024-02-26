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
        id: 1,
        email: 'demo@demo.com',
        username: 'DemoUser',
        firstName: 'DemoFirst',
        lastName: 'DemoLast',
        hashedPassword: bcrypt.hashSync('DemoPassword')
      },
      {
        id: 2,
        email: 'fake1@fake.com',
        username: 'Demo-lition',
        firstName: 'First',
        lastName: 'Demo',
        hashedPassword: bcrypt.hashSync('Password')
      },
      {
        id: 3,
        email: 'fake2@fake.com',
        username: 'FakeUser1',
        firstName: 'Second',
        lastName: 'Fake',
        hashedPassword: bcrypt.hashSync('Password2')
      },
      {
        id: 4,
        email: 'fake3@fake.com',
        username: 'FakeUser2',
        firstName: 'Third',
        lastName: 'Imposter',
        hashedPassword: bcrypt.hashSync('Password3')
      },
      {
        id: 5,
        email: 'laila@fake.com',
        username: 'lailadenman',
        firstName: 'Laila',
        lastName: 'Denman',
        hashedPassword: bcrypt.hashSync('Password4')
      },
      {
        id: 6,
        email: 'jonathan@fake.com',
        username: 'jonathantavitian',
        firstName: 'Jonathan',
        lastName: 'Tavitian',
        hashedPassword: bcrypt.hashSync('Password5')
      },
      {
        id: 7,
        email: "jennifer@fake.com",
        username: "jenniferdavis",
        firstName: "Jennifer",
        lastName: "Davis",
        hashedPassword: "bcrypt.hashSync('DavisPassword')"
      },
      {
        id: 8,
        email: "adam@fake.com",
        username: "adamwilson",
        firstName: "Adam",
        lastName: "Wilson",
        hashedPassword: "bcrypt.hashSync('WilsonPassword')"
      },
      {
        id: 9,
        email: "sophia@fake.com",
        username: "sophiamartinez",
        firstName: "Sophia",
        lastName: "Martinez",
        hashedPassword: "bcrypt.hashSync('MartinezPassword')"
      },
      {
        id: 10,
        email: "william@fake.com",
        username: "williamtaylor",
        firstName: "William",
        lastName: "Taylor",
        hashedPassword: "bcrypt.hashSync('TaylorPassword')"
      },
      {
        id: 11,
        email: "sam@fake.com",
        username: "samwilson",
        firstName: "Sam",
        lastName: "Wilson",
        hashedPassword: "bcrypt.hashSync('SamPassword')"
      },
      {
        id: 12,
        email: "emily@fake.com",
        username: "emilybrown",
        firstName: "Emily",
        lastName: "Brown",
        hashedPassword: "bcrypt.hashSync('BrownPassword')"
      },
      {
        id: 13,
        email: "michael@fake.com",
        username: "michaeljohnson",
        firstName: "Michael",
        lastName: "Johnson",
        hashedPassword: "bcrypt.hashSync('JohnsonPassword')"
      },
      {
        id: 14,
        email: "sarah@fake.com",
        username: "sarahmiller",
        firstName: "Sarah",
        lastName: "Miller",
        hashedPassword: "bcrypt.hashSync('MillerPassword')"
      },
      {
        id: 15,
        email: "david@fake.com",
        username: "davidrobinson",
        firstName: "David",
        lastName: "Robinson",
        hashedPassword: "bcrypt.hashSync('RobinsonPassword')"
      },
      {
        id: 16,
        email: "jessica@fake.com",
        username: "jessicawhite",
        firstName: "Jessica",
        lastName: "White",
        hashedPassword: "bcrypt.hashSync('WhitePassword')"
      },
      {
        id: 17,
        email: "ryan@fake.com",
        username: "ryanmiller",
        firstName: "Ryan",
        lastName: "Miller",
        hashedPassword: "bcrypt.hashSync('RyanPassword')"
      },
      {
        id: 18,
        email: "alex@fake.com",
        username: "alexanderbrown",
        firstName: "Alexander",
        lastName: "Brown",
        hashedPassword: "bcrypt.hashSync('AlexanderPassword')"
      },
      {
        id: 19,
        email: "olivia@fake.com",
        username: "oliviasmith",
        firstName: "Olivia",
        lastName: "Smith",
        hashedPassword: "bcrypt.hashSync('SmithPassword')"
      },
      {
        id: 20,
        email: "nathan@fake.com",
        username: "nathanwilliams",
        firstName: "Nathan",
        lastName: "Williams",
        hashedPassword: "bcrypt.hashSync('WilliamsPassword')"
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, null, {});
  }
};
