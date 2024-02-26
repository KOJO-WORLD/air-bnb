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
      },
      {
        id: 5,
        ownerId: 7,
        address: "123 Main St",
        city: "Springfield",
        state: "IL",
        country: "United States of America",
        lat: "39.781721",
        lng: "-89.650148",
        name: "Cozy Cottage",
        description: "2 bedroom, 1 bathroom",
        price: "299.99"
      },
      {
        id: 6,
        ownerId: 12,
        address: "456 Elm St",
        city: "Riverside",
        state: "CA",
        country: "United States of America",
        lat: "33.981681",
        lng: "-117.375487",
        name: "Riverside Retreat",
        description: "3 bedroom, 2 bathroom",
        price: "149.99"
      },
      {
        id: 7,
        ownerId: 3,
        address: "789 Oak St",
        city: "Portland",
        state: "OR",
        country: "United States of America",
        lat: "45.515458",
        lng: "-122.679346",
        name: "Portland Paradise",
        description: "4 bedroom, 3 bathroom",
        price: "199.99"
      },
      {
        id: 8,
        ownerId: 15,
        address: "321 Pine St",
        city: "Seattle",
        state: "WA",
        country: "United States of America",
        lat: "47.606209",
        lng: "-122.332069",
        name: "Seattle Sanctuary",
        description: "5 bedroom, 4 bathroom",
        price: "249.99"
      },
      {
        id: 9,
        ownerId: 19,
        address: "101 Maple St",
        city: "Denver",
        state: "CO",
        country: "United States of America",
        lat: "39.739235",
        lng: "-104.990250",
        name: "Denver Dream",
        description: "6 bedroom, 5 bathroom",
        price: "299.99"
      },
      {
        id: 10,
        ownerId: 6,
        address: "567 Cedar St",
        city: "Austin",
        state: "TX",
        country: "United States of America",
        lat: "30.267153",
        lng: "-97.743057",
        name: "Austin Abode",
        description: "7 bedroom, 6 bathroom",
        price: "249.99"
      },
      {
        id: 11,
        ownerId: 10,
        address: "890 Walnut St",
        city: "Boston",
        state: "MA",
        country: "United States of America",
        lat: "42.360081",
        lng: "-71.058884",
        name: "Boston Beauty",
        description: "8 bedroom, 7 bathroom",
        price: "399.99"
      },
      {
        id: 12,
        ownerId: 11,
        address: "111 Spruce St",
        city: "Chicago",
        state: "IL",
        country: "United States of America",
        lat: "41.878113",
        lng: "-87.629799",
        name: "Chicago Charm",
        description: "9 bedroom, 8 bathroom",
        price: "449.99"
      },
      {
        id: 13,
        ownerId: 2,
        address: "222 Birch St",
        city: "Dallas",
        state: "TX",
        country: "United States of America",
        lat: "32.776272",
        lng: "-96.796856",
        name: "Dallas Dwelling",
        description: "10 bedroom, 9 bathroom",
        price: "399.99"
      },
      {
        id: 14,
        ownerId: 18,
        address: "333 Oakwood St",
        city: "San Francisco",
        state: "CA",
        country: "United States of America",
        lat: "37.774929",
        lng: "-122.419418",
        name: "San Francisco Splendor",
        description: "11 bedroom, 10 bathroom",
        price: "549.99"
      },
      {
        id: 15,
        ownerId: 14,
        address: "444 Elmwood St",
        city: "Los Angeles",
        state: "CA",
        country: "United States of America",
        lat: "34.052235",
        lng: "-118.243683",
        name: "Los Angeles Luxury",
        description: "12 bedroom, 11 bathroom",
        price: "599.99"
      },
      {
        id: 16,
        ownerId: 16,
        address: "555 Maplewood St",
        city: "New York",
        state: "NY",
        country: "United States of America",
        lat: "40.712776",
        lng: "-74.005974",
        name: "New York Nirvana",
        description: "13 bedroom, 12 bathroom",
        price: "649.99"
      },
      {
        id: 17,
        ownerId: 4,
        address: "666 Cedarwood St",
        city: "Miami",
        state: "FL",
        country: "United States of America",
        lat: "25.761680",
        lng: "-80.191790",
        name: "Miami Mansion",
        description: "14 bedroom, 13 bathroom",
        price: "699.99"
      },
      {
        id: 18,
        ownerId: 1,
        address: "777 Oakwood St",
        city: "Orlando",
        state: "FL",
        country: "United States of America",
        lat: "28.538336",
        lng: "-81.379234",
        name: "Orlando Oasis",
        description: "15 bedroom, 14 bathroom",
        price: "749.99"
      },
      {
        id: 19,
        ownerId: 8,
        address: "999 Maple St",
        city: "Phoenix",
        state: "AZ",
        country: "United States of America",
        lat: "33.448376",
        lng: "-112.074036",
        name: "Phoenix Paradise",
        description: "16 bedroom, 15 bathroom",
        price: "799.99"
      },
      {
        id: 20,
        ownerId: 5,
        address: "1010 Pine St",
        city: "Nashville",
        state: "TN",
        country: "United States of America",
        lat: "36.162664",
        lng: "-86.781602",
        name: "Nashville Nest",
        description: "17 bedroom, 16 bathroom",
        price: "849.99"
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, null, {})
  }
};
