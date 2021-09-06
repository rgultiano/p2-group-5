const router = require('express').Router();
const { User, Quote, UserAuth, Trip, Destination} = require('../models');
const { withAuth } = require('../utils/auth');


var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

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
      },
    });

    const tripArr = tripData.map(trip=>{return trip.get({plain:true})});
    console.log(tripArr);

    res.render('home', {
      trips: tripArr.filter(trip=>trip.status == 'open').map(trip=> {return {showDelete: true, showEdit: true, showSendCuration: true, ...trip}}),
      completed_trips: tripArr.filter(trip=>trip.status == 'completed').map(trip=> {return {showDelete: true, showEdit: true, ...trip}}),
      curated_trips: tripArr.filter(trip=>trip.status == 'awaiting_curation').map(trip=> {return {showDelete: true, showView: true, url: `/trip/${trip.id}/quotes`, ...trip}}),
      booked_trips: tripArr.filter(trip=>trip.status == 'booked').map(trip=> {return {showDelete: true, showView: true, url: '#', ...trip}}),
    });
    return;
  }
  res.render('index'); 
});

// render the login page
router.get('/login', (req, res) => {

  res.render('login');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/trip", withAuth, (req, res) => {
  res.render("trip");
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
  res.render("trip", {trip: tripData.get({plain:true})});
});

router.get("/trip/:id/curate", withAuth, async (req, res) => {
  const tripData = await Trip.findByPk(req.params.id, {
    include: [{ model: Destination}],
    where: {
      user_id: req.session.user_id,
    },
    order:[['destinations', 'order', 'ASC']],
  });
  res.locals.trip_id = req.params.id;
  res.locals.curate_view = true;
  console.log(tripData.get({plain:true}));
  res.render("trip", {trip: tripData.get({plain:true})});
});


router.get("/trip/:id/quotes", withAuth, async (req, res) => {
  const quoteData = await Quote.findAll( {
    include: [{ model: Trip, 
      where: {
        status: 'awaiting_curation',
        deleted_dt: null,
        user_id: req.session.user_id,
      },
    }, {model: User, as: 'curator'}],
    where: {
      trip_id: req.params.id,
    },
  });

  console.log(quoteData.map(quote=>{return quote.get({plain:true})}));
  res.render("trip_quotes", {trip_quotes: quoteData.map(quote=>{return quote.get({plain:true})})});
});

router.get("/trip/:id/quotes/:quote_id", withAuth, async (req, res) => {
  const tripData = await Trip.findByPk(req.params.id, {
    include: [{ model: Destination}],
    where: {
      user_id: req.session.user_id,
    },
    order:[['destinations', 'order', 'ASC']],
  });

  const quoteData = await Quote.findByPk(req.params.quote_id, 
    {
      include: [{ model: Trip, 
      where: {
        status: 'awaiting_curation',
        deleted_dt: null,
        user_id: req.session.user_id,
      },
    }, {model: User, as: 'curator'}],
    where: {
      trip_id: req.params.id,
    },
  });

  res.locals.trip_id = req.params.id;

  console.log(tripData.get({plain:true}));
  res.render("trip", {
    trip: tripData.get({plain:true}), 
    quote: {
            ...quoteData.get({plain: true}),
            formattedAmount:  formatter.format(quoteData.get({plain: true}).amount),
            viewQuote: true,},
    viewQuote: true,
   
  });


});

router.get("/trip/:id/quotes/:quote_id/pay", withAuth, async (req, res) => {
  const tripData = await Trip.findByPk(req.params.id, {
    include: [{ model: Destination}],
    where: {
      user_id: req.session.user_id,
    },
    order:[['destinations', 'order', 'ASC']],
  });

  const quoteData = await Quote.findByPk(req.params.quote_id, 
    {
      include: [{ model: Trip, 
      where: {
        status: 'awaiting_curation',
        deleted_dt: null,
        user_id: req.session.user_id,
      },
    }, {model: User, as: 'curator'}],
    where: {
      trip_id: req.params.id,
    },
  });

  res.locals.trip_id = req.params.id;


  console.log(tripData.get({plain:true}));
  res.render("payment", {
    trip: tripData.get({plain:true}), 
    quote: {
            ...quoteData.get({plain: true}),
            formattedAmount:  formatter.format(quoteData.get({plain: true}).amount)
            },
  });


});

module.exports = router;