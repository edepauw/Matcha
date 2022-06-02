var express = require('express');
var router = express.Router();
var { getUserByPseudo } = require('../services/UsersServices');
var { auth } = require('../services/AuthServices');
var {db} = require('../db');

/* GET users listing. */
router.get('', async (req, res, next) => {
	const tags = await db.promise().query('SELECT * FROM MatchaBDD.Tags')
	res.json(JSON.stringify(tags[0]));
	res.end();
});

module.exports = router;
