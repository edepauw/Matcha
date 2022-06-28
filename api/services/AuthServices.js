const {v4 : uuidv4} = require("uuid")
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { getUserByPseudo, getUserByEMail, createUser, CreateRefresh, delSubToken, getUserBySubToken } = require('../services/UsersServices')
var fs = require('fs');
const jwtKey = fs.readFileSync(__dirname + '/../config/private.pem');
const jwtExpirySeconds = 5 * 60 * 60
var bcrypt = require('bcrypt');
const db = require('../db');
const { sendSub } = require('./MailServices');

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

const authenticate = async (username, email, password, callback) => {
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

const signUp = async (req, res) => {
	// Get credentials from JSON body
	console.log(req.body);
	var { email,firstname, lastname, username, password, confirmed_password } = req.body
	if (!email || !firstname || !lastname || !username || !password || confirmed_password !== password) {
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
			// generer token 32 char
			const tokenSub = uuidv4();
			await createUser(username, lastname, firstname, email, password, tokenSub);
			sendSub(email, tokenSub);
		}
	});
}

const signIn = async (req, res) => {
	// Get credentials from JSON body
	//get cookie
	console.log(req.cookies);
	console.log(req.body);
	const { email, password, username } = req.body
	authenticate(username , email, password, (user) => {
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
		res.json({xsrfToken:xsrfToken})


		/* On envoie une reponse JSON contenant les durées de vie des tokens et le token CSRF */
		res.end()
	});
}

const signInBySubToken = async (req, res) => {
	const user = await getUserBySubToken(req.params.token);
	await delSubToken(user);
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
	maxAge: 3 * 60 * 60 * 1000,
	});

	/* On créer le cookie contenant le refresh token */
	res.cookie('refresh_token', refreshToken, {
	httpOnly: true,
	maxAge: 24 * 60 * 60 * 1000,
	path: '/auth/token'
	});

	res.redirect('http://'+ process.env.IP +':3000/create/account?xsrf='+xsrfToken);
	/* On envoie une reponse JSON contenant les durées de vie des tokens et le token CSRF */
	res.end()
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
	signInBySubToken,
	token
}
