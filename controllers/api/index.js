const router = require('express').Router();

const dbRoutes = require('./dbRoutes');

router.use('/db', dbRoutes);

module.exports = router;
