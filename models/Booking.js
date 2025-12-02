const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Field = require('./Field');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  field_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  booking_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved', 'Declined'),
    defaultValue: 'Pending'
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'bookings',
  timestamps: false
});

Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Field, { foreignKey: 'field_id' });

module.exports = Booking;
