'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      // Spot Images
      {
        url: 'https://axolotlplanet.com/wp-content/uploads/2021/07/File_0004-e1648004625497-1536x1536.png',
        imageableId: 1,
        imageableType: 'spot',
        preview: true,
      },
      {
        url: 'https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg?1618758847',
        imageableId: 1,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://axolotlplanet.com/wp-content/uploads/2021/07/File_0004-e1648004625497-1536x1536.png',
        imageableId: 2,
        imageableType: 'spot',
        preview: true,
      },
      {
        url: 'https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg?1618758847',
        imageableId: 2,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg?1618758847',
        imageableId: 2,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://axolotlplanet.com/wp-content/uploads/2021/07/File_0004-e1648004625497-1536x1536.png',
        imageableId: 3,
        imageableType: 'spot',
        preview: true,
      },
      {
        url: 'https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg?1618758847',
        imageableId: 3,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg?1618758847',
        imageableId: 3,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://axolotlplanet.com/wp-content/uploads/2021/07/File_0004-e1648004625497-1536x1536.png',
        imageableId: 4,
        imageableType: 'spot',
        preview: true,
      },
      {
        url: 'https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg?1618758847',
        imageableId: 4,
        imageableType: 'spot',
        preview: false,
      },
      {
        url: 'https://c402277.ssl.cf1.rackcdn.com/photos/20852/images/magazine_medium/axolotl_WWsummer2021.jpg?1618758847',
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
    await queryInterface.bulkDelete('Images', { imageableType: { [Op.in]: ['review', 'spot'] } }, {});
  }
};
