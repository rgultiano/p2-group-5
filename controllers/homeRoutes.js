const router = require('express').Router();
const apiRoutes = require('./api');

router.get('/login', (req, res) => {
  
    res.render('login');
  });

module.exports = router;
