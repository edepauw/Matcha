const {v4 : uuidv4} = require("uuid")
const {db} = require('../db')
const fs = require('fs');
const sortBy = require('sort-by');

const DistanceCalculator = require('distance-calculator-js');
const path = require('path');
const { randomInt } = require("crypto");
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
	const {date, genre , interested, images, tags, bio} = req.body;
	var tab = []
	for await (element of images)
	{
		if(element === null)
			continue
		var name = uuidv4() + '.png';
		var data = element.replace(/^data:image\/\w+;base64,/, "");
		var buf = Buffer.from(data, 'base64');
		fs.writeFile("public/uploads/" + name, buf, () => {});
		var ret = await db.promise().query('INSERT INTO MatchaBDD.images (path) VALUES (?);', [name]);
		tab.push(ret[0].insertId);
	}
	var orientationId = genre === 'homme' ? 0 : genre === 'femme' ? 7 : genre === 'nonBinaire' ? 14 : -1;
	if (orientationId === -1){
		res.sendStatus(400);
		return
	}
	if (interested.homme && interested.femme && interested.nonBinaire)
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

	await db.promise().query('UPDATE MatchaBDD.Users SET bd=?, orientationId=?, image=?, tags=?, bio=? WHERE id=?;', [date, orientationId, JSON.stringify(tab), JSON.stringify(tags), bio, req.user.id])
	res.sendStatus(200)

	// res.redirect('http://'+ process.env.IP +':3000/home');
}

const getAllUsers = async () =>
{
	const all = await db.promise().query('SELECT * FROM MatchaBDD.Users')
	return all[0]
}
const CreateRefresh = async (userId, token, expiresAt) => {
	const refreesh = await db.promise().query("UPDATE MatchaBDD.Refresh SET token = ? WHERE userId = ?", [token, userId]);
	if(refreesh[0].affectedRows == 0)
		await db.promise().query("INSERT INTO MatchaBDD.Refresh (userId, token, expiresAt) VALUES (?, ?, ?);", [userId, token, expiresAt]);
}
const filter = (array ,user, query) => {
	const { lat, long, dmax, amin, amax} = query;
	var ret = [];
	const MatchMap = [[1,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1],
					[1,0,0,1,0,1,1,1,0,0,1,0,1,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,0,0,1,0,1,1],
					[1,0,0,1,0,1,1,0,0,0,0,0,0,0,1,0,0,1,0,1,1],
					[1,0,0,1,0,1,1,0,0,0,1,0,1,1,1,0,0,1,0,1,1],
					[0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1],
					[0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,0,1,1,0,1],
					[0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,1],
					[0,1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,0,1,1,0,1],
					[0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1],
					[0,0,1,0,1,1,1,0,0,1,0,1,1,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,1,0,1,1,1],
					[0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,1,1],
					[0,0,1,0,1,1,1,0,0,1,0,1,1,1,0,0,1,0,1,1,1]];

		array.forEach((elem) => {
		if(MatchMap[elem.orientationId][user.orientationId])
		{
			if(dateToAge(elem.bd)> amin && dateToAge(elem.bd) < amax)
			{
			console.log(DistanceCalculator.calculate({ lat: lat, long: long }, { lat: elem.latitude, long: elem.longitude }) / 1000)
			if(dmax > (DistanceCalculator.calculate({ lat: lat, long: long }, { lat: elem.latitude, long: elem.longitude }) / 1000))
				{
					console.log('non')
					ret.push(elem)
				}
			}
		}
	})
	return ret;
}
const AddSawUser = async (id, toAdd) => {
	const user = await getUserById(id);
	var {sawUsers} = user;
	if(!sawUsers)
		sawUsers = [];
	sawUsers.push(toAdd);
	await db.promise().query("UPDATE MatchaBDD.Users SET sawUsers = ? WHERE id = ?", [JSON.stringify(sawUsers), id]);
}

const dateToAge = (date) => {
	var year = new Date().getFullYear();
	return year - parseInt(date.split('-')[0])
}
const tagsScore = (user, elem) => {
	var common = 0;
	var x = 0;
	var y = 0;
	while (user.tags[x])
	{
		while(elem.tags[y])
		{
			if(user.tags[x] === elem.tags[y])
			{
				common++;
				break;
			}
			y++;
		}
		x++;
		y = 0;
	}
	return ((common / user.tags.length) * 100);
}
const sort = (array, user, coords, dmax) => {
	var score = [];
	var i = 0;
	while(array[i])
	{
		var dist = DistanceCalculator.calculate({ lat: coords.lat, long: coords.long }, { lat: array[i].latitude, long: array[i].longitude }) / 1000
		var distscore = (dist / dmax) * 100;
		var tagssc = tagsScore(user, array[i]);
		var agescore = 100 - (Math.abs(dateToAge(user.bd) - dateToAge(user.bd)) * 2)
		score.push({id:i,
				score: ((distscore + tagssc + agescore)/300)*100
			})
		i++;
	}
	var ret = [];
	i = 0
	score.sort(sortBy('-score'))
	while(score[i])
	{
		ret.push(array[score[i].id])
		i++;
	}
	return ret
}
const updateCoords = async (id, coords) =>{
	 await db.promise().query("UPDATE MatchaBDD.Users SET longitude = ?, latitude = ? WHERE id = ?", [coords.long, coords.lat, id]);
}
const toPublic = (user) => {
	return ({id: user.id,username:user.username,lastname:user.lastname,firstname:user.firstname, orientationId:user.orientationId, bio:user.bio, bd:user.bd, tags:user.tags, images:user.image})
}
const Matchmaking = async (req, res) => {
	console.log(req.user)
	updateCoords(req.user.id, {lat:req.query.lat, long: req.query.long} )
	const all = await getAllUsers()
	const notDiscovered = getNotDiscovered(req.user.sawUsers, all);
	const filtered = filter(notDiscovered, req.user, req.query);
	const sorted = sort(filtered, req.user, {lat:req.query.lat, long: req.query.long}, req.query.dmax)
	const random = sorted[0] // pas random pour l'instant meilleur score first
	if(!random)
	{
		res.json({message: "no more match possible, change your filter or come back later!"})
		return
	}
	await AddSawUser(req.user.id, random.id)
	res.json(toPublic(random))
}

const getNotDiscovered = (restrictArray ,array) => {
	if(!restrictArray)
		return array;
	var ret = [];
	var x = 0;
	var y = 0;
	var ok = true;
	while (array[x])
	{
		ok = true;
		while(restrictArray[y])
		{
			if(restrictArray[y] === array[x].id)
				ok = false
			y++;
		}
		if (ok)
			ret.push(array[x])
		y = 0;
		x++;
	}
	return ret;
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
	CreateRefresh,
	Matchmaking
}
