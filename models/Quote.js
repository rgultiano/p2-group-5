const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Quote extends Model {}

Quote.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    curator_id: {
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
    valid_until: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: true,
      autoIncrement: false,
    },
    booking_details: {
      type: DataTypes.STRING,
      allowNull: true,
      autoIncrement: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "quote",
  }
);

module.exports = Quote;
