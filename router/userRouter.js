const express = require("express");
const userRouter = express.Router();
const { getAllUsers, createUser, getUser, updateUser, deleteUser, checkInput } = require("../controller/userController")

let { signup, protectRoute, isAuthorize, login, updatepassword, forgetPassword, resetPassword, logout } = require("../controller/authController");
userRouter
    .route("/signup")
    .post(signup);

userRouter
    .route("/login")
    .post(login);

userRouter
    .route("/updateuser")
    .patch(updateUser);

userRouter
    .route("/updateuser")
    .post(updateUser);

userRouter
    .route("/updatepassword")
    .patch(updatepassword)

userRouter
    .route("/forgetpassword")
    .patch(forgetPassword);
    
userRouter
    .route("/forgetpassword")
    .post(forgetPassword);

userRouter.route("/logout").get(logout);

userRouter
    .route("/resetpassword/:token")
    .patch(resetPassword);

userRouter
    .route("").
    get(protectRoute, isAuthorize(["admin"]), getAllUsers).
    post(protectRoute, isAuthorize(["admin", "Restaurant Owner"]), createUser);


userRouter
    .route("/:id")
    .get(getUser)
    .patch(isAuthorize(["admin"]), updateUser)
    .delete(isAuthorize(["admin"]), deleteUser);

module.exports = userRouter;