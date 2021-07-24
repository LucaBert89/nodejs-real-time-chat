const form = document.querySelector(".login-app-container__signup-form");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    emailError.innerText = "";
    passwordError.innerText = "";

    try{
        const res = await fetch("/signup", {
            method: "Post",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        console.log(data.errors)
        if(data.errors) {
            emailError.innerText = data.errors.email;
            passwordError.innerText = data.errors.password;
            return
        }
        console.log(data);
        if(data._id) {
            location.assign("/login");
        }
    }
    catch(err) {
        console.log(err);
    }
})