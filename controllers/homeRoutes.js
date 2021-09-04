const router = require('express').Router();
const apiRoutes = require('./api');
const { withAuth } = require('../utils/auth');

// render homepage as index
router.get('/', function (req, res) {
  if (!req.session.logged_in) {
    res.render('home'); 
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

router.get("/trip/:id", withAuth, (req, res) => {
  res.locals.trip_id = req.params.id;
  res.render("trip");
});

module.exports = router;