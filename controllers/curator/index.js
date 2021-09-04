const router = require('express').Router();

const dbRoutes = require('./dbRoutes');
const userRoutes = require('./userRoutes');

router.use('/', homeRoutes);

module.exports = router;