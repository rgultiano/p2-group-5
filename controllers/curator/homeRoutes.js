const router = require('express').Router();
const { User, UserAuth, Trip, Destination} = require('../../models');
const { withAuth, curatorWithAuth} = require('../../utils/auth');

// render homepage as index
router.get('/', async (req, res) => {
  if (req.session.curator_logged_in) {
    console.log({user_id: req.session.user_id});
    res.locals.sess_user_id = req.session.user_id;
    const tripData = await Trip.findAll( {
      include: [{ model: Destination}],
      where: {
        status: 'awaiting_curation',
        deleted_dt: null,
      },
    });

    const tripArr = tripData.map(trip=>{return trip.get({plain:true})});
    console.log(tripArr);

    res.render('curator', {
      isCuratorRoute: true,
      awaiting_curation_trip: tripArr.filter(trip=>trip.status == 'awaiting_curation').map(trip=> {return {showView: true, ...trip}}),
    });
    return;
  }
  res.render('login', {isCuratorRoute: true}); 
});

// render the login page
router.get('/login', (req, res) => {

  res.render('login', {isCuratorRoute: true});
});

router.get("/signup", (req, res) => {
  res.render("curator_signup", {isCuratorRoute: true});
});

router.get('/onboard', withAuth, (req, res) => {
  if (req.session.logged_in) {
    User.update(
      {
        rol: 'U001'
        // trip_id: trip_id,
      },
      {
        where: {
          id: req.session.user_id,
        }
      });
      
      req.session.curator_user_id = req.session.user_id;
      req.session.curator_logged_in = true;
      res.redirect('/curator/')
  } else {
      res.status(404).end();
  }
});

router.get("/trip/:id", curatorWithAuth, async (req, res) => {
  const tripData = await Trip.findByPk(req.params.id, {
    include: [{ model: Destination}],
    where: {
      status: 'awaiting_curator',
      deleted_dt: null,
    },
    order:[['destinations', 'order', 'ASC']],
  });
  res.locals.trip_id = req.params.id;
  res.locals.trip = 
  console.log(tripData.get({plain:true}));
  res.render("trip", {isCuratorRoute: true, trip: tripData.get({plain:true})});
});

router.get("/trip/:id/quote", curatorWithAuth, async (req, res) => {
  const tripData = await Trip.findByPk(req.params.id, {
    include: [{ model: Destination}],
    where: {
      user_id: req.session.user_id,
    },
    order:[['destinations', 'order', 'ASC']],
  });
  res.locals.trip_id = req.params.id;
  res.locals.curate_view = true;
  res.locals.trip = 
  console.log(tripData.get({plain:true}));
  res.render("trip", {isCuratorRoute: true, isQuote: true, trip: tripData.get({plain:true})});
});

module.exports = router;