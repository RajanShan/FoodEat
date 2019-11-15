const stripe = Stripe('pk_test_AkFmRHeZ8v0jSEnQ3S57MKCV00HZIHaD8g');

//Ye login vala page pura select kr leta h taki jaise he login event occur ho ya jaise he bnda jaye logoin page pe
// aur 
const login = document.querySelector(".login");
// const forgetpassword = document.querySelector();//css class name
const signupButtons = document.querySelectorAll(".signup-button");

console.log("inside login");

async function mylogin(email, password) {
    console.log(email + "email" + "password" + password);
    const result = await axios.post("/api/user/login", { email, password });
    if (result.data.success) {
        //alert vala popup aata h isse

        alert("user logged in");
        //Popup pe jaise he ok click krte h to ye home page pe hume route kr deta h
        location.assign("/");
    } else {
        alert("wrong mail or password");
    }
}

async function myupdate(email) {
    // console.log(email + "email" + "password" + password);
    const result = await axios.post("/api/user/forgetpassword", { email });
    if (result.data.success) {
        //alert vala popup aata h isse

        alert("Please check you email");
        //Popup pe jaise he ok click krte h to ye home page pe hume route kr deta h
        // location.assign("/resetpassword");
    } else {
        alert("wrong mail");
    }
}
async function bookings(id) {
    const result = await axios.post("/api/booking/checkout", { id });
    if (result.data.success) {
        //payment
        // console.log(result.data.session);
        await stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: result.data.session.id
          })
        alert("Payment kro");

    } else {
        console.log("Something went wrong");
    }
}


//jaise he submit pe click krege to login vala event on ho jayega aur ye function chlega
if (login) {
    login.addEventListener("submit", function (event) {
        //Page reload hota h jaise he submit pe click krte h to vo hum nh chahte aise ho
        event.preventDefault();
        //Uss page pe jitne bhi input tags honge vo aa jayege taki hum vha se data utha k database pe check kr ske
        const inputs = document.getElementsByTagName("input");
        const email = inputs[0].value;
        const password = inputs[1].value;
        //isse upar vala mylogin function call hoga aur vo database main jaa k email aur password verfiy krega user ka
        mylogin(email, password)
    });
}

// if (forgetPassword) {
//     login.addEventListener("submit", function (event) {
//         event.preventDefault();
//         const inputs = document.getElementsByTagName("input");
//         const email = inputs[0].value;
//         myupdate(email)
//     });
// }

if (signupButtons) {
    console.log(signupButtons);
    for (var i = 0; i < signupButtons.length; i++) {
        signupButtons[i].addEventListener("click", function (event) {
            // console.lo
            bookings(event.target.getAttribute("plan-id"));
        });
    }
}