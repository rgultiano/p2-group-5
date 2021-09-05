// import models
const User = require('./User');
const UserAuth = require('./UserAuth');
const Booking = require('./Booking');
const Trip = require('./Trip');
const Destination = require('./Destination');
const Quote = require('./Quote');

UserAuth.belongsTo(User, {
    foreignKey: 'user_id',
});
  
// Categories have many Products
User.hasMany(UserAuth, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
 });

 module.exports = {
    User,
    UserAuth,
    Booking,
    Trip,
    Destination,
  };

  Destination.belongsTo(Trip, {
      foreignKey: 'trip_id',
  });

  Trip.hasMany(Destination, {
    foreignKey: 'trip_id',
    onDelete: 'CASCADE',
 });