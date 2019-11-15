const planModel = require("../Model/planModel");
module.exports.HomePage = async function (req, res) {
    const user = req.user;
    let plans = await planModel.find();
    plans = plans.slice(0, 3);
    // console.log(plans);
    res.status(200).render("home.pug", {
        plans: plans,
        pageName: "Home Page", user
    });
};

module.exports.planPage = async function (req, res) {
    const user = req.user;
    let plans = await planModel.find();
    console.log(plans)
    //gt All plans
    res.status(200).render("planPage.pug", {
        plans: plans,
        pageName: "Plan Page", user
    });
};
module.exports.getLoginPage = async function (req, res) {
    res.status(200).render("login.pug");
};

module.exports.getSignUpPage = async function (req, res) {
    res.status(200).render("signUp.pug");
}
module.exports.getProfilePage = async function (req, res) {
    const user = req.user;
    res.status(200).render("me.pug", { user });
};
module.exports.getUpdatePage = async function (req, res) {
    const user = req.user;
    res.status(200).render("updateuser.pug", { user });
};
module.exports.getForgetPasswordPage=async function(req,res){
    res.status(200).render("forgetpassword.pug");
};

