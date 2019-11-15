const express = require("express");
const viewRouter = express.Router();
const { HomePage, planPage, getLoginPage, getSignUpPage, getProfilePage, getUpdatePage, getForgetPasswordPage } = require("../controller/viewController")
const { protectRoute, isloggedIn } = require("../controller/authController");
viewRouter.use(isloggedIn);
viewRouter
    .route("/")
    .get(HomePage)
viewRouter
    .route("/plans")
    .get(planPage);

viewRouter
    .route("/login")
    .get(getLoginPage);

viewRouter
    .route("/signup")
    .get(getSignUpPage);

viewRouter
    .route("/me")
    .get(protectRoute, getProfilePage);
viewRouter
.route("/updateuser")
.get(getUpdatePage);

viewRouter
.route("/forgetpassword")
.get(getForgetPasswordPage)

module.exports = viewRouter;