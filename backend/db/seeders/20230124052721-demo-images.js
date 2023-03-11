'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Images'
    await queryInterface.bulkInsert(options, [
      // Spot Images
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562645/fake_House1_duraad.jpg',
        imageableId: 1,
        imageableType: 'spot',
        preview: true,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562686/Fake_House2_qvglm7.jpg',
        imageableId: 1,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562645/fake_House1_duraad.jpg',
        imageableId: 2,
        imageableType: 'spot',
        preview: true,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562686/Fake_House2_qvglm7.jpg',
        imageableId: 2,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562686/Fake_House2_qvglm7.jpg',
        imageableId: 2,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562645/fake_House1_duraad.jpg',
        imageableId: 3,
        imageableType: 'spot',
        preview: true,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562686/Fake_House2_qvglm7.jpg',
        imageableId: 3,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562686/Fake_House2_qvglm7.jpg',
        imageableId: 3,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562645/fake_House1_duraad.jpg',
        imageableId: 4,
        imageableType: 'spot',
        preview: true,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562686/Fake_House2_qvglm7.jpg',
        imageableId: 4,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://res.cloudinary.com/dbiv2lwhp/image/upload/v1678562686/Fake_House2_qvglm7.jpg',
        imageableId: 4,
        imageableType: 'spot',
        preview: false,
      },
      // Review Images
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 1,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 1,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 1,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 3,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 3,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 4,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 6,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 7,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 8,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 10,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 10,
        imageableType: 'review',
        preview: false,
      },
      {
        url: 'https://img.freepik.com/free-vector/cute-axolotl-cartoon-illustration-animal-love-concept-isolated-flat-cartoon_138676-2290.jpg',
        imageableId: 10,
        imageableType: 'review',
        preview: false,
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Images'
    await queryInterface.bulkDelete(options, null, {});
  }
};
