var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');

module.exports = {
    sendMail :function(req, res, next) {
        /* Notre code pour nodemailer */
        var transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                //xoauth2: xoauth2.createXOAuth2Generator({ 
                user: 'decarvalho.karl@gmail.com',
                pass: 'xtCY7vp6Qu'
                //})
            }
        });


        var mailOptions = {
            from: req.body.sender,
            to: req.body.destination,
            subject: req.body.subject,
            text: req.body.message,
            html: '<b>' + req.body.message + '</b>'
    };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            });
   
            transporter.close();
        }
}