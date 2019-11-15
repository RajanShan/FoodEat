// app.use(function (req, res, next) {
//     const data = "Request processed successfully";
//     // res.status(200).json({
//     //     status:"successfull",
//     //     data
//     // });
//     var key = Object.keys(req.body)[0];
//     if (req.body[key] == "rtyuin") {
//         req.name = "Vishal";
//     }
//     req.myproperty = "I have modified the request";
//     next();
// });

// app.get("/",function(req,res){
//     const data="Request processed from home successfully"+req.myproperty;
//     res.status(200).json({
//         status:"successfull",
//         data
//     });
// });

// app.post("/",function(req,res){
//     const data="Request processed from home successfully"+req.myproperty;
//     res.status(200).json({
//         status:"successfull",
//         data
//     });
// });

//get all users

const server = require("./api");
const port=process.env.PORT||3000;
server.listen(port, function () {
    console.log("Server is listening at port 3000");
});