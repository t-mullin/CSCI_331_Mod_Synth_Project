var express = require('express');
var db = require('../app');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  res.send(db.getMongo());
  next();
});

module.exports = router;
