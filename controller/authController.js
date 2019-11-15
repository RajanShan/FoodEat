const userModel = require("../Model/userModel");
var jwt = require("jsonwebtoken");
const secret = "mysecret";
const email = require("../utility/email");
//define secret key
module.exports.signup = async function (req, res) {
    // console.log(req.body)
    //create user
    const user = await userModel.create(req.body);
    //get id from user/payload
    const id = user["_id"];

    //jwt.sign(token)
    const token = await jwt.sign({ id }, secret);
    res.cookie("jwt", token, {
        httpOnly: true
    });
    res.status(201).json({
        success: "User Created",
        user,
        token
    });
};
module.exports.login = async function (req, res) {
    const email = req.body.email;
    const user = await userModel.find({ "email": email });
    const pass = req.body.password;
    // console.log(pass);
    if (user[0]) {
        const upass = user[0].password
        // console.log(upass);
        const id = user[0]["_id"];
        // console.log(id);
        const answer = await bycrypt.compare(upass, pass);
        if (answer) {
            const token = await jwt.sign({ id }, secret);
            res.cookie("jwt", token, {
                httpOnly: true
            });
            //  console.log("Valid user")
            res.status(201).json({
                data: "user verified",
                success: "user verified",
                token
            })
        }
        else {
            res.status(201).json({ data: "email or password" })
        }
    }
    else {
        res.status(201).json({ data: "user not verified" })
        // console.log("Invalid user");
    }
};
module.exports.logout = function (req, res) {
    //token ki jga galta token bhj diya
    res.cookie("jwt", "sdhcbkcs", {
        httpOnly: true,
        expires: new Date(Date.now() + 10)//token will expire in 10 sec
    });
    res.redirect("/")
};
module.exports.isloggedIn = async function (req, res, next) {
    const token = req.cookies ? req.cookies.jwt : null || req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    try {
        if (token) {
            const utoken = token;
            const ans = await jwt.verify(utoken, secret);
            if (ans) {
                const user = await userModel.findById(ans.id);
                req.role = user.role;
                req.user = user;
                next();
            } else {
                next();
            }
        } else {
            next();
        }
    }
    catch (err) {

        res.json({
            err
        })
    }
}
module.exports.protectRoute = async function (req, res, next) {
    const token = req.cookies ? req.cookies.jwt : null || req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    try {
        if (token) {
            const utoken = token;
            const ans = await jwt.verify(utoken, secret);
            if (ans) {
                const user = await userModel.findById(ans.id);
                req.role = user.role;
                req.user = user;
                next();
            } else {
                return res.status(401).json({
                    data: "Something went wrong please login again"
                });
            }
        } else {
            return res.status(401).json({
                data: "User not logged in"
            });
        }
    }
    catch (err) {
        res.json({
            data: err
        })
    }
}

module.exports.isAuthorize = function (roles) {
    return function (req, res, next) {
        console.log(roles);
        if (roles.includes(req.role)) {
            next();
        } else {
            res.status(401).json({
                data: "You are not authorized"
            });
        }
    };
};

module.exports.updatepassword = async function (req, res) {
    const user = req.user;
    if (req.body.password && req.body.newpassword && req.body.confirmpassword) {
        const prevPass = req.body.password;
        const newPass = req.body.newpassword;
        const confirmpassword = req.body.confirmpassword;
        const answer = await bycrypt.compare(user.password, prevPass)
        if (answer) {
            user.password = newPass;
            user.confirmpassword = confirmpassword;
            user.save();
        }
    } else {
        res.json({
            data: "Please enter correct input"
        });
    }
};
//forgot Password

module.exports.forgetPassword = async function (req, res) {
    //1. findOne using email
    try {
        var user = await userModel.findOne({ email: req.body.email });
        if (user) {
            //2. add token property to that user
            const token = user.generateToken();
            user.token = token;
            await user.save({ validateBeforeSave: false });
            const options = {
                to: user.email,  //list of receivers
                subject: "Reset Token",  //Subject line
                text: `Please click on this token to reset your password`,
                html: `<h1> Your reset password token is: ${token}`  //html body
            }
            await email(options)
            res.status(201).json({
                // token
                success: "Reset token has been send to your registered email id"
            })
        }
    } catch{
        res.status(201).json({
            // token
            success: "Reset token has been send to your registered email id"
        })
    }
    //send token to the client
};

module.exports.resetPassword = async function (req, res) {
    // const { token } = req.params;
    try {
        const user = await userModel.findOne({ token: req.params.token });
        if (req.body.password && req.body.confirmpassword) {
            console.log(user + " hi " + req.params.token);
            const newPass = req.body.password;
            const confirmpassword = req.body.confirmpassword;
            user.password = newPass;
            user.confirmpassword = confirmpassword;
            user.token = undefined;
            await user.save();
        } else {
            res.json({
                data: "Please enter the inputs"
            })
        }
    } catch{
        res.json({
            data: "Please fuck yourself7"
        })
    }
};