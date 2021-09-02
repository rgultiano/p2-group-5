const router = require('express').Router();
const apiRoutes = require('./api');

// render the login page
router.get('/login', (req, res) => {

  res.render('login');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
