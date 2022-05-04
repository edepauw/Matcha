var mysql = require('mysql2');
var dbConfig = require('./config/db.config')

const db = mysql.createConnection({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.passwd,
	database: dbConfig.name,
});

db.connect(function(err) {
	if (err) throw err;
	console.log("Connecté à la base de données MySQL!");

	var sql = "CREATE TABLE IF NOT EXISTS MatchaBDD.Users (\
		`id` INT NOT NULL,\
		`username` VARCHAR(15) NULL,\
		`email` VARCHAR(100) NULL,\
		`password` VARCHAR(100) NULL,\
		`genre` VARCHAR(10) NULL,\
		`orientation` VARCHAR(10) NULL,\
		`description` VARCHAR(400) NULL,\
		`age` INT NULL,\
		`locationX` FLOAT NULL,\
		`locationY` FLOAT NULL,\
		`tags` JSON NULL,\
		`image` JSON NULL,\
		`meLikeUsers` JSON NULL,\
		`userLikesMe` JSON NULL,\
		`recentProfile` JSON NULL,\
		`recentVisit` JSON NULL,\
		`matchs` JSON NULL,\
		PRIMARY KEY (`id`));"
	db.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Table Users créée!");
	});
});


module.exports = db
