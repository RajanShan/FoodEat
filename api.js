const express = require("express");
const cookieParser = require("cookie-parser");
//DDOs attack
const rateLimit=require("express-rate-limit");
//query injection
const mongoSanitize=require("express-mongo-sanitize");
//parameter pollution
const hpp=require("hpp")
//setup express app
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(mongoSanitize());
app.use(hpp());

//Middleware
//HTML file aur CSS files0 require kr li humne isme jo hmara foodEat app vali th
//to serve static files
app.use(express.static("public/FoodDelivery"));
//to express to not to ignore incoming json data from body
app.use(express.json());

const limiter=rateLimit({
    windowMs: 15*60*1000,  //15 minutes
    max:1000,//limit each IP to 100 requests per windowMS
    message:"You crossed the limit"
});

//aply to all requests
app.use(limiter);

const userRouter = require("./router/userRouter")
const planRouter = require("./router/planRouter");
const viewRouter = require("./router/viewRouter");
const bookingRouter=require("./router/bookingRouter");
//Routes
//templating engine
app.set("view engine", "pug");
//template folder
app.set("views", "view");
// app.get("/",function(req,res){
//     res.status(200).render("home.pug");
// });
app.use("/", viewRouter);
app.use("/api/user", userRouter);
app.use("/api/plan", planRouter)
app.use("/api/booking",bookingRouter);
module.exports = app;