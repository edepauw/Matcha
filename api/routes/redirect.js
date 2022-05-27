var express = require('express');
var router = express.Router();
var {redirectSub}= require("../services/RedirectServices")

router.get('/sub/:token', async (req, res)=> {
    console.log("fdppppppp");
    await redirectSub(req,res)
});

module.exports = router;
