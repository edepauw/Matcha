const {v4 : uuidv4} = require("uuid")
var {db} = require('../db')
var fs = require('fs');
const path = require('path');
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

const completeUser = async (req, res) => {
	const {genre , interested, images, tags, bio} = req.body;
	for (element of images)
	{
		if(element === null)
			continue
		console.log("",element)
		var data = element.replace(/^data:image\/\w+;base64,/, "");
		var buf = Buffer.from(data, 'base64');
		fs.writeFile(uuidv4() + '.png', buf, () => {});
	}
	console.log(genre , interested, tags, bio);
	var orientationId = genre === 0 ? 0 : genre === 1 ? 7 : genre === 2? 14 : -1;
	if(interested.homme && interested.femme && interested.nonBinaire)
		orientationId += 6;
	else if(interested.femme && interested.homme)
		orientationId += 3;
	else if(interested.femme && interested.nonBinaire)
		orientationId += 4;
	else if(interested.homme && interested.nonBinaire)
		orientationId += 5;
	else if(interested.homme)
		orientationId += 0;
	else if(interested.femme)
		orientationId += 1;
	else if(interested.nonBinaire)
		orientationId += 2;
	var tab = []
	// imgs.forEach( async (elem) =>{
	// console.log('fefe')
	// // var id = uuidv4();
	// 	tab.push(id)
	// 	// fs.writeFileSync(uploadPath+ "/" + id + ".jpg", elem);
	// 	await db.promise().query('INSERT INTO MatchaBDD.images (uuid, path) VALUES (?, ?);', [id, id + ".jpg"]);
	// })
	await db.promise().query('UPDATE MatchaBDD.Users SET orientationId=?, image=?, tags=?, bio=? WHERE id=?;', [orientationId, JSON.stringify(images), JSON.stringify(tags), bio, req.user.id])
}


const CreateRefresh = async (userId, token, expiresAt) => {
		//update token where userId = userId
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

const matchableByTag = async (userId, tag) => {
	const users = await getAllMatchableUsers(userId);
	users.forEach((user) => {

	})
}


module.exports = {
	getUserByPseudo,
	getUserByEMail,
	getUserById,
	createUser,
	delSubToken,
	getUserBySubToken,
	completeUser,
	CreateRefresh
}
