const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const curatorRoutes = require('./curator');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/curator', curatorRoutes);

module.exports = router;
