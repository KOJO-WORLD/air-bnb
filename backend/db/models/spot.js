'use strict';
const {
  Model
} = require('sequelize');
const User = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User,
        {
          as: 'Owner',
          foreignKey: 'ownerId'
        }
      )

      Spot.hasMany(
        models.Booking,
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      )

      Spot.hasMany(
        models.Review,
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      )

      Spot.hasMany(
        models.Image,
        {
          as: 'SpotImages',
          foreignKey: 'imageableId',
          onDelete: 'CASCADE',
          hooks: true,
          scope: {
            imageableType: 'spot'
          }
        }
      )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Spot;
};
