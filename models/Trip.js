const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    departure: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    return: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    groupsize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "easy",
    },
    ratingsAverage: {
      type: DataTypes.INTEGER,
      defaultValue: 4.5,
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 4.5,
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_dt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "trip",
  }
);

module.exports = Trip;
