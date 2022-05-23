const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { getUserByPseudo, getUserByEMail, createUser, CreateRefresh } = require('../services/UsersServices')
var fs = require('fs');
const jwtKey = fs.readFileSync(__dirname + '/../config/private.pem');
const jwtExpirySeconds = 5 * 60 * 60
var bcrypt = require('bcrypt');
const db = require('../db');
const cryptPassword = function (password, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		if (err)
			return callback(err);
		bcrypt.hash(password, salt, function (err, hash) {
			return callback(err, hash);
		});
	});
};

const comparePassword = function (plainPass, hashword, callback) {
	bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
		return err == null ?
			callback(null, isPasswordMatch) :
			callback(err, false);
	});
};

const authenticate = async (username,email, password, callback) => {
	const user = await getUserByPseudo(username ?? email) ?? await getUserByEMail(email) ?? null
	if (!user)
		return callback(null)
	comparePassword(password, user.password, (err, Valid) => {
		if (err || !Valid)
			return callback(null)
		else
			return callback(user)
	});
}

const users = {
	user1: 'password1',
	user2: 'password2'
}
const signUp = async (req, res) => {
	// Get credentials from JSON body
	console.log(req.body);
	var { email, username, password, repassword } = req.body
	if (!email || !username || !password || repassword !== password) {
		res.status(400).json({
			error: 'Bad Request',
			message: 'Please provide email, username and password'
		})
		return
	}
	cryptPassword(password, async (err, hash) => {
		if (err) {
			res.status(400).json({
				error: 'Bad Request',
				message: 'error'
			})
			return
		} else {
			password = hash
			username = username.toLowerCase()
			if (await getUserByPseudo(username)) {
				res.status(400).json({
					error: 'Username already exists',
					message: 'Please choose another username'
				})
				return
			}
			if (await getUserByEMail(email)) {
				res.status(400).json({
					error: 'Email already exists',
					message: 'Please choose another email'
				})
				return
			}
			await createUser(username, email, password);
			await signIn(req, res)
		}
	});
}

const signIn = async (req, res) => {


	// Get credentials from JSON body
	//get cookie
	console.log(req.cookies);
	console.log(req.body);
	const { email, password } = req.body
	authenticate(req.body.username , email, password, (user) => {
		if (!user) {
			res.status(400).json({
				error: 'Bad Request',
				message: 'Invalid username or password'
			})
			res.end()
			return
		}
		//user found
		const xsrfToken = crypto.randomBytes(64).toString('hex');
		/* On créer le JWT avec le token CSRF dans le payload */
		const expires = Math.floor(Date.now() / 1000) + jwtExpirySeconds;
		const accessToken = jwt.sign(
		{ userId: user.id, xsrfToken },
		jwtKey,
		{
			algorithm: "ES256",
			subject: user.username,
			expiresIn: expires
		}
		);

		/* On créer le refresh token et on le stocke en BDD */
		const refreshToken = crypto.randomBytes(128).toString('base64');
		CreateRefresh(user.id, refreshToken, expires);

		/* On créer le cookie contenant le JWT */
		res.cookie('access_token', accessToken, {
		httpOnly: true,
		maxAge: 30 * 60 * 60 * 1000,
		});

		/* On créer le cookie contenant le refresh token */
		res.cookie('refresh_token', refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
		path: '/auth/token'
		});

		/* On envoie une reponse JSON contenant les durées de vie des tokens et le token CSRF */
		res.json({
		accessTokenExpiresIn: jwtExpirySeconds,
		refreshTokenExpiresIn: jwtExpirySeconds,
		xsrfToken
		});
		res.end()
	});
}

const auth =  async (req, res, next) => {
	try {
	  const { cookies, headers } = req;

	  /* On vérifie que le JWT est présent dans les cookies de la requête */
	  if (!cookies || !cookies.access_token) {
		return res.status(401).json({ message: 'Missing token in cookie' });
	  }

	  const accessToken = cookies.access_token;

	  /* On vérifie que le token CSRF est présent dans les en-têtes de la requête */
	  if (!headers || !headers['x-xsrf-token']) {
		return res.status(401).json({ message: 'Missing XSRF token in headers' });
	  }

	  const xsrfToken = headers['x-xsrf-token'];

	  /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
	  const decodedToken = jwt.verify(accessToken, secret, {
		algorithms: algorithm
	  });

	  /* On vérifie que le token CSRF correspond à celui présent dans le JWT  */
	  if (xsrfToken !== decodedToken.xsrfToken) {
		return res.status(401).json({ message: 'Bad xsrf token' });
	  }

	  /* On vérifie que l'utilisateur existe bien dans notre base de données */
	  const user = await getUserByPseudo(decodedToken.username);

	  /* On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
	  req.user = user;

	  /* On appelle le prochain middleware */
	  if(user)
	  	return next();
	  else
	  	return res.status(401).json({ message: 'User not found' });
	} catch (err) {
	  return res.status(500).json({ message: 'Internal error' });
	}
  }

  const token =  async (req, res, next) => {
	const {cookies } = req;
	if (!cookies || !cookies.refresh_token) {
	  return res.status(401).json({ message: 'Missing token in cookie' });
	}
	const user = await getUserByPseudo();
	const xsrfToken = crypto.randomBytes(64).toString('hex');
		/* On créer le JWT avec le token CSRF dans le payload */
		const expires = Math.floor(Date.now() / 1000) + jwtExpirySeconds;
		const accessToken = jwt.sign(
		{ userId: user.id, xsrfToken },
		jwtKey,
		{
			algorithm: "ES256",
			subject: user.username,
			expiresIn: expires
		}
		);

		/* On créer le refresh token et on le stocke en BDD */
		const refreshToken = crypto.randomBytes(128).toString('base64');
		CreateRefresh(user.id, refreshToken, 24 * 60 * 60 * 1000);

		/* On créer le cookie contenant le JWT */
		res.cookie('access_token', accessToken, {
		httpOnly: true,
		maxAge: 30 * 60 * 1000,
		});

		/* On créer le cookie contenant le refresh token */
		res.cookie('refresh_token', refreshToken, {
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
		path: '/auth/token'
		});

		/* On envoie une reponse JSON contenant les durées de vie des tokens et le token CSRF */
		res.json({
		accessTokenExpiresIn: jwtExpirySeconds,
		refreshTokenExpiresIn: jwtExpirySeconds,
		xsrfToken
		});
		res.end()

}


module.exports = {
	signUp,
	signIn,
	auth,
	token
}
