const {v4 : uuidv4} = require("uuid")
var {db} = require('../db')
var fs = require('fs');
const path = require('path');
const multer = require("multer");
// const uploadPath = path.join(__dirname , '/public/uploads');


const getUserById = async (id) => {
	const user = await db.promise().query('SELECT * FROM MatchaBDD.Users WHERE id = ?', [id])
	return user[0][0]
}
const getUserByPseudo = async (username) => {
	const user = await db.promise().query('SELECT * FROM MatchaBDD.Users WHERE username = ?', [username])
	return user[0][0]
}

const getUserBySubToken = async (subToken) => {
	const user = await db.promise().query('SELECT * FROM MatchaBDD.Users WHERE subToken = ?', [subToken])
	return user[0][0]
}

const delSubToken = async (user) => {
	await db.promise().query('UPDATE MatchaBDD.Users SET subToken=false WHERE id=?', [user.id])
}

const getUserByEMail = async (email) => {
	const user = await db.promise().query('SELECT * FROM MatchaBDD.Users WHERE email = ?', [email])
	return user[0][0]
}

const createUser = async (pseudo, lastname, firstname, email, password, tokenSub) => {
	const user = await db.promise().query("INSERT INTO MatchaBDD.Users (username, lastname, firstname, email, password, subToken) VALUES\
	(?, ?, ?, ? ,?, ?);", [pseudo, lastname, firstname, email, password, tokenSub]);
}

const formatAndStockImage = async (img) => {
	console.log(img.type);
	var ext = img.type.split('/')[1];
	var name = uuidv4() + '.'+ ext;
	var ret = await db.promise().query('INSERT INTO MatchaBDD.images (path) VALUES (?);', [name]);
	img.name = name;
	return ret[0].insertId;
}

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads')
	}
	, filename: function (req, file, cb) {
		cb(null, file.name)
	}
})

const completeUser = async (req, res) => {
	console.log(req.body);
	const {genre, tags, bio, femme, homme, nonBinaire} = req.fields;
	const { imgs0, imgs1, imgs2, imgs3, imgs4, imgs5 } = req.files;
	var tab = []
	if (imgs0) 
		tab.push(await formatAndStockImage(imgs0));
	if (imgs1) 
		tab.push(await formatAndStockImage(imgs1));
	if (imgs2) 
		tab.push(await formatAndStockImage(imgs2));
	if (imgs3) 
		tab.push(await formatAndStockImage(imgs3));
	if (imgs4) 
		tab.push(await formatAndStockImage(imgs4));
	if (imgs5) 
		tab.push(await formatAndStockImage(imgs5));
	var orientationId = genre === 'homme' ? 0 : genre === 'femme' ? 7 : genre === 'nonBinaire' ? 14 : -1;
    if (orientationId === -1){
        res.sendStatus(400);
        return
    }
    if (homme === 'true' && femme === 'true'&& nonBinaire === 'true')
	orientationId += 6;
    else if(femme  === 'true' && homme === 'true')
        orientationId += 3;
    else if(femme === 'true' && nonBinaire === 'true')
        orientationId += 4;
    else if(homme === 'true' && nonBinaire === 'true')
        orientationId += 5;
    else if(homme === 'true')
        orientationId += 0;
    else if(femme === 'true')
        orientationId += 1;
    else if(nonBinaire === 'true')
        orientationId += 2;
	console.log(femme)
	console.log(orientationId)

	await db.promise().query('UPDATE MatchaBDD.Users SET orientationId=?, image=?, tags=?, bio=? WHERE id=?;', [orientationId, JSON.stringify(tab), JSON.stringify(tags), bio, req.user.id])

	var upload = multer({ storage: storage }).array('imgs0', 1);
	console.log(upload);
	res.sendStatus(200)

	// res.redirect('http://'+ process.env.IP +':3000/home');
}


const CreateRefresh = async (userId, token, expiresAt) => {
	const refreesh = await db.promise().query("UPDATE MatchaBDD.Refresh SET token = ? WHERE userId = ?", [token, userId]);
	console.log(refreesh[0].affectedRows)
	if(refreesh[0].affectedRows == 0)
		await db.promise().query("INSERT INTO MatchaBDD.Refresh (userId, token, expiresAt) VALUES (?, ?, ?);", [userId, token, expiresAt]);
}
const getAllMatchableUsers = async (userId, token, expiresAt) => {
	var MatchMap = ["110101",
					"111010",
					"010100",
					"101000",
					"010010",
					"100001"];
	const user = await getUserById(userId);
	if(user.genre == "Homme" && user.orientation == "Bi")
		intone = 0;
	if(user.genre == "Femme" && user.orientations == "Bi")
		intone = 1;
	if(user.genre == "Homme" && user.orientations == "Hetero")
		intone = 2;
	if(user.genre == "Femme" && user.orientations == "Hetero")
		intone = 3;
	if(user.orientations == "Lesbian")
		intone = 4;
	if(user.orientations == "Gay")
		intone = 5;
	const all = await db.promise().query('SELECT * FROM MatchaBDD.Users')
	console.log(all[0])
	var ret = [];
	all[0].forEach((cur) => {
		var inttwo;
		if(cur.genre == "Homme" && cur.orientation == "Bi")
			inttwo = 0;
		if(cur.userGenre == "Femme" && cur.orientations == "Bi")
			inttwo = 1;
		if(cur.userGenre == "Homme" && cur.orientations == "Hetero")
			inttwo = 2;
		if(cur.userGenre == "Femme" && cur.orientations == "Hetero")
			inttwo = 3;
		if(cur.orientations == "Lesbian")
			inttwo = 4;
		if(cur.orientations == "Gay")
			inttwo = 5;
		if(MatchMap[intone][inttwo])
			ret.push(cur)
	})
	return ret;
}

const toPublic = () => {
}

const getMe = (req, res) =>{
	console.log(req.user);
	const { username, lastname, email, orientationId, bio, dms, age, tags, image, meLikeUsers, userLikesMe, matchs} = req.user
	res.json({username, lastname, email, orientationId, bio, dms, age, tags, image, meLikeUsers, userLikesMe, matchs})
	res.end()
}

const matchableByTag = async (userId, tag) => {
	const users = await getAllMatchableUsers(userId);
	users.forEach((user) => {

	})
}


module.exports = {
	getUserByPseudo,
	getUserByEMail,
	getMe,
	getUserById,
	createUser,
	delSubToken,
	getUserBySubToken,
	completeUser,
	CreateRefresh
}
