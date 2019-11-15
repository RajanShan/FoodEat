const fs = require("fs");
// const plans = fs.readFileSync("./data/plan.json");
const planModel = require("../Model/planModel");
// const parsedplan = JSON.parse(plans);
module.exports.addqueryParams=function(req,res,next){
    req.query.sort="-averagerating";
    req.query.price[lte]=100;
    req.query.limit=5;
    next();
};
module.exports.getAllPlans = async function (req, res) {
    // console.log(req.params);
    // gt,lt,lte,gte

    // find({type:"organic",duration:{$gt:10}})
    // find({type:"organic",duration:{gt:10}})

    // Advanced filtering
    // sort
    // limit
    // paginate

    let wholeQuery = { ...req.query };

    //excluded unwanted parameters

    let excludeEntity = ["sort", "select", "page", "limit"];
    for (let i = 0; i < excludeEntity.length; i++) {
        delete wholeQuery[excludeEntity[i]];
    }

    //complex filtering
    let stringQuery = JSON.stringify(wholeQuery);
    stringQuery = stringQuery.replace(/gt|lt|lte|gte/g, function (match) {
        return "$" + match;
    });

    let query = JSON.parse(stringQuery);
    let plans = planModel.find(query);

    //sort
    if (req.query.sort) {
        plans = plans.sort()
    }
    if (req.query.select) {
        let selectionCriteria = req.query.select.split("%").join(" ");
        console.log(selectionCriteria);
        plan = plans.select(selectionCriteria);
    }

    //paginate
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.page) || 3;
    const toSkip = limit * (page - 1);
    plan = plan.skip(toSkip).limit(limit);

    let allplans = await plans;

    // query execution
    const plans = await planModel.find(query);
    return res.status(200).json({
        sucess: "Params accepted successfully",
        data: plans
    });
};
module.exports.getPlan = async function (req, res) {
    console.log(req.params);
    const { id } = req.params;
    const plan = await planModel.findById(id);
    // console.log(id);
    // // const plan = parsedplan[id - 1];
    return res.status(200).json({
        sucess: "Params accepted successfully",
        data: plan
    });
};
module.exports.createPlan = async function (req, res) {
    // server
    // id
    // const id = parsedplan.length + 1;
    //
    // const plan = req.body;
    try {
        console.log(req.body);
        //
        // plan.id = id;
        const plan = await planModel.create(req.body);
        return res.status(200).json({
            sucess: "plan added successfully",
            data: plan
        });
    } catch (err) {
        return res.status(401).json({
            sucess: "plan could not be added",
            data: err
        });
    }
};

// parsedplan.push(plan);

// fs.writeFileSync("./data/plan.json", JSON.stringify(parsedplan));
// console.log(id);
//  plan
module.exports.updatePlan = async function (req, res) {
    // console.log(req.params);
    // req.body;

    const { id } = req.params;
    // new => return updated object
    // upsert => create
    const plan = await planModel.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
        sucess: "plan Data updated Successfully",
        data: plan
    });
};
module.exports.deletePlan = function (req, res) {
    res.status(200).json({
        sucess: "plan Data Deleted Successfully",
        data: plan
    });
};