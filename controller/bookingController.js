const planModel = require("../Model/planModel");
const stripe = require("stripe")("sk_test_gvLAdp44rc9pdzPIzC37m12s00JxFslgn3");

module.exports.checkout = async function (req, res) {
    const id = req.body.id;
    const plan = await planModel.findById(id);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: plan.name,
            description: plan.description,
            amount: plan.price,
            currency: 'usd',
            quantity: 1,
        }],
        success_url: '/',
        cancel_url: '/',
    });
    res.status(201).json({
        data: plan,
        success: "paymetn object send",
        session
    });
};