const router = require('express').Router();
const { User, UserAuth, Trip, Destination} = require('../models');
const apiRoutes = require('./api');
const apiRoutes = require('./curator');
const { withAuth } = require('../utils/auth');

// render homepage as index
router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    console.log({user_id: req.session.user_id});
    res.locals.sess_user_id = req.session.user_id;
    const tripData = await Trip.findAll( {
      include: [{ model: Destination}],
      where: {
        user_id: req.session.user_id,
        deleted_dt: null,
        role: 'C001',
        status: 'awaiting_curation',
      },
    });

    const tripArr = tripData.map(trip=>{return trip.get({plain:true})});
    console.log(tripArr);

    res.render('curator', {
      awaiting_curation_trip: tripArr,
    });
    return;
  }
  res.render('index', {isCuratorRout: true}); 
});

// render the login page
router.get('/login', (req, res) => {

  res.render('login', {isCuratorRout: true});
});

router.get("/signup", (req, res) => {
  res.render("signup", {isCuratorRout: true});
});

router.get("/trip", withAuth, (req, res) => {
  res.render("trip"), {isCuratorRout: true};
});

router.get("/trip/:id", withAuth, async (req, res) => {
  const tripData = await Trip.findByPk(req.params.id, {
    include: [{ model: Destination}],
    where: {
      user_id: req.session.user_id,
    },
    order:[['destinations', 'order', 'ASC']],
  });
  res.locals.trip_id = req.params.id;
  res.locals.trip = 
  console.log(tripData.get({plain:true}));
  res.render("trip", {isCuratorRoute: true, trip: tripData.get({plain:true})});
});

module.exports = router;