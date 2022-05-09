var db = require('../db')



const getUserByPseudo = async (username) => {
	const user = await db.promise().query('SELECT * FROM MatchaBDD.Users WHERE username = ?', [username])
	return user[0][0]
}
const getUserByEMail = async (email) => {
	const user = await db.promise().query('SELECT * FROM MatchaBDD.Users WHERE email = ?', [email])
	return user[0][0]
}

const createUser = (pseudo, email, password) => {
	db.query("INSERT INTO MatchaBDD.Users (username, email, password, genre, orientation, description, age, locationX, locationY, tags, image, meLikeUsers, userLikesMe, recentProfile, recentVisit, matchs) VALUES\
										(?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?);", [pseudo, email, password, "n/a", "n/a", "n/a", -1 , 0, 0, "[]", "[]", "[]", "[]", "[]", "[]", "[]"], (err, rows) => {
		if (err) return null;
		console.log(err)
		return rows
	});
}


module.exports = {
	getUserByPseudo,
	getUserByEMail,
	createUser
}
