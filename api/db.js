var mysql = require('mysql2');
var dbConfig = require('./config/db.config')
const lineReader = require("line-reader");
const Promise = require("bluebird");
const eachLine = Promise.promisify(lineReader.eachLine);

const db = mysql.createConnection({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.passwd,
	database: dbConfig.name,
});

db.connect(async (err) =>{ //db.connect()
	if (err) throw err;
	console.log("Connecté à la base de données MySQL!");
});

const initTables = async () => {
	var sql = "CREATE TABLE IF NOT EXISTS MatchaBDD.Users (\
		`id` INT NOT NULL AUTO_INCREMENT,\
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
		await db.promise().query(sql);
		const res = await db.promise().query("SELECT COUNT(*) FROM MatchaBDD.Users;");
		if(res[0][0]['COUNT(*)'] == 0)
			eachLine('seed.sql', (line) => db.query(line, function (err, result) {if (err) throw err;})).then(() => console.log('Table User cree!','Seeding done!'));
		sql = "CREATE TABLE IF NOT EXISTS MatchaBDD.Refresh (\
			`userId` INT NOT NULL,\
			`token` TEXT NULL,\
			`expiresAt` VARCHAR(10) NULL );"
		await db.promise().query(sql);
		console.log("Table Refresh crée!");
}


module.exports =
	{
	db,
	initTables
	}
