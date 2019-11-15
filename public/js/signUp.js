const signUp = document.querySelector(".signUp");

async function signup(name, email, password, confirmpassword) {
    // console.log(email + "email" + "password" + password);

    //Backend part
    const result = await axios.post("/api/user/signup", { name, email, password, confirmpassword });
    if (result.data.success) {
        alert("You have successfully Signed up");
        location.assign("/");
    } else {
        alert("Please fill all the required details");
    }
}
//UI part
if (signUp) {
    signUp.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.getElementsByTagName("input");
        console.log(inputs);
        const name = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;
        const confirmpassword = inputs[3].value
        signup(name, email, password, confirmpassword)
    });
}