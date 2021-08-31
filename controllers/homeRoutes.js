const router = require('express').Router();
const apiRoutes = require('./api');

// render homepage as index
router.get('/',withAuth, function (req, res) {
    res.render('index'); 
});

// render the login page
router.get('/login', (req, res) => {
  
    res.render('login');
  });

module.exports = router;
