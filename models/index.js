// import models
const User = require('./User');
const UserAuth = require('./UserAuth');
const Booking = require('./Booking');
const Trip = require('./Trip');

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
  };