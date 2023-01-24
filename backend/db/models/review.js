'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      )

      Review.belongsTo(
        models.Spot,
        { foreignKey: 'spotId' }
      )

      Review.hasMany(
        models.Image,
        {
          foreignKey: 'imageableId',
          onDelete: 'CASCADE',
          hooks: true,
          scope: {
            imageableType: 'review'
          }
        }
      )
    }
  }
  review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'review',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return review;
};
