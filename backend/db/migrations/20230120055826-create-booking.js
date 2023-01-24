'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Spots',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isFormatCorrect(date) {
            const splitDate = date.split('-');
            if (splitDate !== 3) {
              throw new Error('Please make sure to enter the date in this format mm-dd-dddd')
            } else if (splitDate[0].length !== 2) {
              throw new Error('Please make sure to enter the date in this format mm-dd-dddd')
            } else if (splitDate[1].length !== 2) {
              throw new Error('Please make sure to enter the date in this format mm-dd-dddd')
            } else if (splitDate[1].length !== 4) {
              throw new Error('Please make sure to enter the date in this format mm-dd-dddd')
            }
          },
          isBeforeEndDate(date) {
            const [month, day, year] = date.split('-');
            const [endMonth, endDay, endYear] = this.endDate.split('-');
            if (year > endYear) {
              throw new Error('Please make sure start date is earlier than the end date');
            } else if (month > endMonth) {
              throw new Error('Please make sure start date is earlier than the end date');
            } else if (day > endDay) {
              throw new Error('Please make sure start date is earlier than the end date');
            }
          }
        }
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          isAfterStartDate(date) {
            const [month, day, year] = date.split('-');
            const [startMonth, startDay, startYear] = this.startDate.split('-');
            if (year < startYear) {
              throw new Error('Please make sure start date is earlier than the end date');
            } else if (month < startMonth) {
              throw new Error('Please make sure start date is earlier than the end date');
            } else if (day < startDay) {
              throw new Error('Please make sure start date is earlier than the end date');
            }
          },
          isFormatCorrect(date) {
            const splitDate = date.split('-');
            if (splitDate !== 3) {
              throw new Error('Please make sure to enter the date in this format mm-dd-dddd')
            } else if (splitDate[0].length !== 2) {
              throw new Error('Please make sure to enter the date in this format mm-dd-dddd')
            } else if (splitDate[1].length !== 2) {
              throw new Error('Please make sure to enter the date in this format mm-dd-dddd')
            } else if (splitDate[1].length !== 4) {
              throw new Error('Please make sure to enter the date in this format mm-dd-dddd')
            }
          },
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};
