const {getUserBySubToken} = require("./UsersServices")
const { signInBySubToken} = require("./AuthServices")

const redirectSub = async (req, res) => {
    const user = await getUserBySubToken(req.params.token);
    if(!user){
        res.status(400).send()
        return
    }
    await signInBySubToken(req, res);
}
module.exports = {redirectSub}