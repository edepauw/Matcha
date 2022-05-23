var {db} = require('../db')


const getUserById = async (id) => {
	const user = await db.promise().query('SELECT * FROM MatchaBDD.Users WHERE id = ?', [id])
	return user[0][0]
}
const getUserByPseudo = async (username) => {
	const user = await db.promise().query('SELECT * FROM MatchaBDD.Users WHERE username = ?', [username])
	return user[0][0]
}
const getUserByEMail = async (email) => {
	const user = await db.promise().query('SELECT * FROM MatchaBDD.Users WHERE email = ?', [email])
	return user[0][0]
}

const createUser = async (pseudo, email, password) => {
	const user = await db.promise().query("INSERT INTO MatchaBDD.Users (username, email, password, genre, orientation, description, age, locationX, locationY, tags, image, meLikeUsers, userLikesMe, recentProfile, recentVisit, matchs) VALUES\
										(?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?);", [pseudo, email, password, "n/a", "n/a", "n/a", -1 , 0, 0, "[]", "[]", "[]", "[]", "[]", "[]", "[]"]);
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
	if(user.userGenre == "Femme" && user.orientations == "Bi")
		intone = 1;
	if(user.userGenre == "Homme" && user.orientations == "Hetero")
		intone = 2;
	if(user.userGenre == "Femme" && user.orientations == "Hetero")
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
	createUser,
	CreateRefresh
}
