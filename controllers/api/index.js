const router = require('express').Router();

const dbRoutes = require('./dbRoutes');
const userRoutes = require('./userRoutes');
const curatorRoutes = require('./curatorRoutes');

router.use('/db', dbRoutes);
router.use('/users', userRoutes);
router.use('/curator', curatorRoutes);

module.exports = router;
