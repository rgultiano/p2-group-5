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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    departure_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completed_dt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_dt:{
      type: DataTypes.DATE,
      allowNull: true,
    },
    status:{
      type: DataTypes.STRING,
      defaultValue: 'open',
      validate:{
        isIn: {
            args: [['open', 'awaiting_curation', 'booked', 'completed']],
          }
      },
      allowNull: true,
    },
    groupsize: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
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
