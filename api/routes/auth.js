var express = require("express");
var router = express.Router();
var {signUp, signIn} = require('../services/AuthServices')

router.post("/signup", signUp);
router.post("/login", signIn);

module.exports = router;
