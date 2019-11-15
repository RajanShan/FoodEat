//Driver
const mongoose = require("mongoose");
//DB
const validatior = require("validator");
const DB = "mongodb+srv://mady:gkkt3f2QQoUVzWQT@cluster0-eryou.mongodb.net/test?retryWrites=true&w=majority";
const crypto = require("crypto");
const bcypt=require("bcrypt");
mongoose.connect(DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(function (conn) {
    // console.log(conn.connection);
    console.log("User DB connected ");
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a required Field"],
        maxlength: 40,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        validate: validatior.isEmail
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "Restaurant Owner", "user", "Delivery Boy"],
        default: "user"
    },
    confirmpassword: {
        type: String,
        required: true,
        validate: {
            validator: function () {
                return this.password === this.confirmpassword;
            },
            message: "Password and confirm password are not equal"
        }
    },
    token: String
});

userSchema.pre("save", async function () {
    this.password = await bcypt.hash(this.password, 8);
    this.confirmpassword = undefined;
});

userSchema.method("generateToken", function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.token = token;
    return token;
});
// collections

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;