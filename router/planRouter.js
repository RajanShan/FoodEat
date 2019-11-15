const express = require("express");
const planRouter = express.Router();
const { getAllPlans, createPlan, getPlan, updatePlan, deletePlan,addqueryParams} = require("../controller/planController")

planRouter
    .route("")
    .get(getAllPlans)
    .post(createPlan);
    planRouter.route("/best-5-plans").get(addqueryParams,getAllPlans);
planRouter
    .route("/:id")
    .get(getPlan)
    .patch(updatePlan)
    .delete(deletePlan);

module.exports=planRouter;