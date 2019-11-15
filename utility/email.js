const nodemailer = require("nodemailer");
module.exports = async function (options) {
    // 1. create setting
    try {
        var transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service:"gmail",
            auth: {
                user: "madhusudan1795malik@gmail.com",
                pass: "xhiybpcrokiyqgaw"
            }
        });
        //2. Email options
        const emailOptions = {
            from: `"Origami" <madhusudan1795malik@gmail.com`, //sender address
            to: options.to,  //list of receivers
            subject: options.subject,  //Subject line
            text: options.text,
            html: options.html  //html body
        };

        //3.
        await transport.sendMail(emailOptions);
    } catch (err) {
        throw new Error(err);
    }
};