var express = require('express');
const { auth } = require('../services/AuthMiddleware');
var router = express.Router();
var { getUserByPseudo, completeUser} = require('../services/UsersServices');

/* GET users listing. */
router.post('/completeProfile', (req, res) => auth(req, res, completeUser));

router.get('/:pseudo', async (req, res, next) => {
  const {username, genre, orientation, description, age, locationX, locationY, tags, image, meLikeUsers, userLikesMe, recentProfile, recentVisit, matchs} = await getUserByPseudo(req.params.pseudo);
  res.json({username:username, genre:genre, orientation:orientation, description:description, age:age, locationX:locationX, locationY:locationY, tags:tags, image:image, meLikeUsers:meLikeUsers, userLikesMe:userLikesMe, recentProfile:recentProfile, recentVisit:recentVisit, matchs:matchs});
});
router.get('/me', (req, res) => auth(req, res, (req) => {
  console.log(req.user)
}));

module.exports = router;
