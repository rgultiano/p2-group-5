const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Booking extends Model {}

Booking.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    trip_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "trip",
        key: "id",
      },
    },
    booking_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "booking",
  }
);

module.exports = Booking;
