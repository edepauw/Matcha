var express = require("express");
var router = express.Router();
var {signUp} = require('../services/AuthServices')

router.post("/signup", signUp);

module.exports = router;
