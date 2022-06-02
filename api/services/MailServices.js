
var nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.gmail.com",
       auth: {
            user: 'geecoeur.contact@gmail.com',
            pass: 'ymhbjhnpxqqshnxr',
         },
});

const sendRecover = () => {

}
const sendSub = (email, access_token) => {
    const mailData = {
        from: 'geecoeur.contact@gmail.com',  // sender address
          to: email,   // list of receivers
          subject: 'Sending Email using Node.js',
          text: 'That was easy!',
          html: 'For verification click <a href="http://' + process.env.IP +':667/redirect/sub/' + access_token + '">here</a> !',
        };
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
}
module.exports = {sendSub}