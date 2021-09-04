const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Destination extends Model {}

Destination.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    days: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Trip",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "destination",
  }
);

module.exports = Destination;
