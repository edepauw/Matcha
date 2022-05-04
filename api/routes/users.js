var express = require('express');
var router = express.Router();
var userServices = require('../services/UsersServices');
var AuthServices = require('../services/AuthServices');

/* GET users listing. */
router.get('/:pseudo', function(req, res, next) {
  console.log(req.params.pseudo)
  if(AuthServices.AuthServices(req.cookies.token))
  userServices.getUserByPseudo(req.params.pseudo, (user) => {
    console.log(user);
  });
  res.send(user);
});

module.exports = router;
