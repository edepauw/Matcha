const jwt = require('jsonwebtoken')
const { getUserByPseudo, getUserByEMail, createUser } = require('../services/UsersServices')
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 3 * 60 * 60
var bcrypt = require('bcrypt');
let ts = Date.now()
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
			callback(err);
	});
};

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
				message: 'Please provide email, username and password'
			})
			return
		} else {
			password = hash
			username = username.toLowerCase()
			if (await getUserByPseudo(username)) {
				res.status(400).json({
					error: 'Username already exists',
					message: 'Change your username'
				})
				return
			}
			if (await getUserByEMail(email)) {
				res.status(400).json({
					error: 'Email already exists',
					message: 'Change your email'
				})
				return
			}
			const token = jwt.sign({ email }, jwtKey, {
				algorithm: 'HS256',
				expiresIn: jwtExpirySeconds
			})
			createUser(username, email, password)
			console.log('token:', token)
			res.json({ token: token, expires: ts + jwtExpirySeconds * 1000, username: username })
			res.end()
		}
	});
}

const signIn = (req, res) => {
	// Get credentials from JSON body
	console.log(req.body);

	const { username, password } = req.body
	const user = getUserByPseudo(username) ?? getUserByEMail(username) ?? null
	if (!user) {
		res.status(400).json({
			error: 'User not found',
			message: 'Please check your username and password'
		})
		comparePassword(password, user.password, (err, isMatch) => {
			if (err) {
				res.status(400).json({
					error: 'Bad Request',
					message: 'Please provide email, username and password'
				})
			}
			else {
				if (isMatch) {
					const retToken = jwt.sign({ username }, jwtKey, {
						algorithm: 'HS256',
						expiresIn: jwtExpirySeconds
					})
					res.json({ token: retToken, expires: jwtExpirySeconds * 1000, username: username })
				}
				else {
					res.status(400).json({
						error: 'Wrong',
						message: 'Please check your username and password'
					})
					res.end()
				}
			}
		});
	}
	else {
		res.status(400).json({
			error: 'Bad Request',
			message: 'Please provide email, username and password'
		})
		res.end()
	}
}

const verify = (token) => {
	if (!token)
		return null
	var payload
	try {
		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return null
		}
		return null
	}
	return (payload)
}

const refresh = (req, res) => {
	// (BEGIN) The code uptil this point is the same as the first part of the `welcome` route
	const token = req.cookies.token

	if (!token) {
		return res.status(401).end()
	}

	var payload
	try {
		payload = jwt.verify(token, jwtKey)
	} catch (e) {
		if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end()
		}
		return res.status(400).end()
	}
	// (END) The code uptil this point is the same as the first part of the `welcome` route

	// We ensure that a new token is not issued until enough time has elapsed
	// In this case, a new token will only be issued if the old token is within
	// 30 seconds of expiry. Otherwise, return a bad request status
	const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
	if (payload.exp - nowUnixSeconds > 30) {
		return res.status(400).end()
	}

	// Now, create a new token for the current user, with a renewed expiration time
	const newToken = jwt.sign({ username: payload.username }, jwtKey, {
		algorithm: 'HS256',
		expiresIn: jwtExpirySeconds
	})

	// Set the new token as the users `token` cookie
	res.cookie('token', newToken, { maxAge: jwtExpirySeconds * 1000 })
	res.end()
}

module.exports = {
	signUp,
	signIn,
	verify,
	refresh
}
