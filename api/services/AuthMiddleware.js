const jwt = require('jsonwebtoken')
var fs = require('fs');
const {getUserById, completeUser} = require('../services/UsersServices')
const jwtKey = fs.readFileSync(__dirname + '/../config/private.pem');

const auth = async (req, res, next) => {
	try {
	  const { cookies, headers } = req;
		console.log(req.body)
	  if (!cookies || !cookies.access_token) {
		return res.status(401).json({ message: 'Missing token in cookie' });
	  }
	  const accessToken = cookies.access_token;


	  if (!headers || !headers['x-xsrf-token']) {
		return res.status(401).json({ message: 'Missing XSRF token in headers' });
	  }

	  const xsrfToken = headers['x-xsrf-token'];

	  const decodedToken = jwt.verify(accessToken, jwtKey, {
		algorithms: "ES256"

	  });

	  if (xsrfToken !== decodedToken.xsrfToken) {
		return res.status(401).json({ message: 'Bad xsrf token' });
	  }

	  console.log(decodedToken)
	  const {userId} = decodedToken;
	  const user = await getUserById(userId);
		  console.log('sisi')
		if (!user) {
		  return res.status(401).json({ message: `User ${userId} not exists` });
		}
		req.user = user;
		console.log('ici')
		next(req, res)
		
	} catch (err) {
	  return res.status(400).json({ message: err });
	}
  }

module.exports={auth}