'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(
        models.Spot,
        { foreignKey: 'imageableId' }
      )

      Image.belongsTo(
        models.Review,
        { foreignKey: 'imageableId' }
      )
    }
  }
  image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageabletype: {
      type: DataTypes.ENUM('spot','review'),
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'image',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return image;
};
