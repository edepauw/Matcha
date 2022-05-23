var express = require("express");
var router = express.Router();
var {signUp, signIn, token} = require('../services/AuthServices')

router.post("/signup", signUp);
router.post("/login", signIn);
router.post("/token", token);

module.exports = router;
