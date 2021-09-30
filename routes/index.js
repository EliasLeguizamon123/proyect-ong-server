var express = require('express');
var router = express.Router();
const newsRoutes = require('./news')

/* News routes */
router.use("/news", newsRoutes);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;