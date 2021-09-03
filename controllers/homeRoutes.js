const router = require('express').Router();
const apiRoutes = require('./api');

// render homepage as index
router.get('/', function (req, res) {
    res.render('index'); 
});

// render the login page
router.get('/login', (req, res) => {

  res.render('login');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/create_trip", (req, res) => {
  res.render("createTrip");
});

module.exports = router;