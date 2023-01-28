'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    await queryInterface.bulkInsert(options, [
      {
        id: 1,
        ownerId: 1,
        address: '13624 Moorpark St.',
        city: 'Sherman Oaks',
        state: 'CA',
        country: 'United States of America',
        lat: '34.15018',
        lng: '-118.43041',
        name: 'Sherman Oaks Vet Group',
        description: 'Veterinary Hospital for cats and dogs',
        price: '599.99'
      },
      {
        id: 2,
        ownerId: 1,
        address: '16629 Knapp St.',
        city: 'North Hills',
        state: 'CA',
        country: 'United States of America',
        lat: '34.23857757108717',
        lng: '-118.49469841777524',
        name: 'My Home',
        description: '4 bedroom, 3 bathroom',
        price: '999.99'
      },
      {
        id: 3,
        ownerId: 2,
        address: '9858 Balboa Blvd',
        city: 'Northridge',
        state: 'CA',
        country: 'United States of America',
        lat: '34.24994716163182',
        lng: '-118.50198092178813',
        name: 'My Home',
        description: '4 bedroom, 3 bathroom',
        price: '1499.99'
      },
      {
        id: 4,
        ownerId: 1,
        address: '26101 Magic Mountain Pkwy',
        city: 'Valencia',
        state: 'CA',
        country: 'United States of America',
        lat: '34.42534366221238',
        lng: '-118.59722698670562',
        name: 'Six Flags Magic Mountain',
        description: 'Home of the thrills',
        price: '135.75'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, null, {})
  }
};
