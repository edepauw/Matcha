var db = require('../db')



const getUserByPseudo = (pseudo) => {
	db.query('SELECT * FROM MatchaBDD.Users WHERE pseudo = ?', [pseudo], (err, rows) => {
		if (err) return null;
		console.log('ici' + rows[0])
		console.log(!rows[0]);
		if(!rows[0])
			return null
		console.log('1')
		return rows[0]
	});
	return null
}
const getUserByEMail = (email) => {
	db.query('SELECT * FROM MatchaBDD.Users WHERE email = ?', [email], (err, rows) => {
		if (err) return null;
		if(!rows[0])
			return null
		return rows[0]
	});
	return null
}

const createUser = (pseudo, email, password) => {
	db.query('INSERT INTO MatchaBDD.Users (pseudo, email, password) VALUES (?, ?, ?)', [pseudo, email, password], (err, rows) => {
		if (err) return null;
		return rows
	});
}


module.exports = {
	getUserByPseudo,
	getUserByEMail
}
