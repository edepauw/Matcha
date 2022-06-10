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
	var tags = "CREATE TABLE IF NOT EXISTS MatchaBDD.Tags (\
		`id` INT NOT NULL AUTO_INCREMENT,\
		`value` VARCHAR(32) NOT NULL,\
		PRIMARY KEY (`id`));"
	await db.promise().query(tags);
	const tagsprom = await db.promise().query("SELECT COUNT(*) FROM MatchaBDD.Tags;");
	if(tagsprom[0][0]['COUNT(*)'] == 0)
		eachLine('tags.sql', (line) => db.query(line, function (err, result) {if (err) throw err;})).then(() => console.log('Seeding Tags done!'));
	var dms = "CREATE TABLE IF NOT EXISTS MatchaBDD.DMs (\
		`id` INT NOT NULL AUTO_INCREMENT,\
		`idTwo` VARCHAR(32) NULL,\
		`idOne` VARCHAR(32) NULL,\
		`msgs` JSON NULL,\
		PRIMARY KEY (`id`));"
	await db.promise().query(dms);
	var users = "CREATE TABLE IF NOT EXISTS MatchaBDD.Users (\
		`id` INT NOT NULL AUTO_INCREMENT,\
		`username` VARCHAR(20) NULL,\
		`lastname` VARCHAR(20) NULL,\
		`firstname` VARCHAR(20) NULL,\
		`email` VARCHAR(100) NULL,\
		`password` VARCHAR(255) NULL,\
		`orientationId` INT NULL,\
		`bio` VARCHAR(400) NULL,\
		`dms` JSON NULL,\
		`age` INT NULL,\
		`locationX` FLOAT NULL,\
		`locationY` FLOAT NULL,\
		`tags` JSON NULL,\
		`image` JSON NULL,\
		`score` INT NULL,\
		`meLikeUsers` JSON NULL,\
		`userLikesMe` JSON NULL,\
		`matchs` JSON NULL,\
		`subToken` VARCHAR(255) DEFAULT NULL,\
		PRIMARY KEY (`id`));"
//INSERT INTO `MatchaBDD`.`Users` (`username`, `lastname`, `firstname`, `email`, `password`, `orientationId`, `bio`, `dms`, `age`, `locationX`, `locationY`, `tags`, `image`, `score`, `meLikeUsers`, `userLikesMe`) VALUES ('ede', 'dede', 'dede', 'dedde', 'ddd', '4', 'ddddfdfddd', '\"[]\"', '0', '4', '55', '\"[]\"', '\"[]\"', '54', '\"[]\"', '\"[]\"');
//INSERT INTO MatchaBDD.Users (username, lastname, firstname, email ,password, orientationId, bio, dms, age, locationX, locationY, tags, image, score, meLikeUsers, userLikesMe, matchs) VALUES ("Charlotte","Charlotte","Charlotte","Charlotte@gmail.com","Charlottepasswd",7,"This is a third description","[]",21,1.51441,46.3118,"["day","sport","savage","food","summer"]","http://localhost:667/uploads/edepauw0.jpg",65,"["Claudelle","Norval","Shontal"]","["Norval","Shontal"]","["Norval","Shontal"]");
		await db.promise().query(users);
		const res = await db.promise().query("SELECT COUNT(*) FROM MatchaBDD.Users;");
		if(res[0][0]['COUNT(*)'] == 0)
			eachLine('seed.sql', (line) => db.query(line, function (err, result) {if (err) throw err;})).then(() => console.log('Table User cree!','Seeding done!'));
		const refresh = "CREATE TABLE IF NOT EXISTS MatchaBDD.Refresh (\
			`userId` INT NOT NULL,\
			`token` TEXT NULL,\
			`expiresAt` VARCHAR(10) NULL );"
		await db.promise().query(refresh);
		const sublink = "CREATE TABLE IF NOT EXISTS MatchaBDD.Sublink (\
			`userId` INT NOT NULL,\
			`token` TEXT NULL\
			);"
		await db.promise().query(sublink);
		const images = "CREATE TABLE IF NOT EXISTS MatchaBDD.images (\
			`id` INT NOT NULL AUTO_INCREMENT,\
			`path` TEXT NULL,\
			PRIMARY KEY (`id`));"
		await db.promise().query(images);
		console.log("Table Refresh crée!");
}


module.exports =
	{
	db,
	initTables
	}
