const router = require('express').Router();
const apiRoutes = require('./api');

<<<<<<< HEAD
=======
// render homepage as index
router.get('/', function (req, res) {
    res.render('index'); 
});

>>>>>>> develop
// render the login page
router.get('/login', (req, res) => {

  res.render('login');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;