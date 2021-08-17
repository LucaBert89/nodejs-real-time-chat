const form = document.querySelector(".login-app-container__login-form");
const emailError = document.querySelector(".login-form__email-error");
const passwordError = document.querySelector(".login-form__password-error");

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    //reset error handling values
    emailError.innerText = "";
    passwordError.innerText = "";

    try{
        const res = await fetch("/login", {
            method: "Post",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // fetch response take data or error
        const data = await res.json();
        console.log(data);
        //if inside data there is an errors obj
        if(data.errors) {
            emailError.innerText = data.errors.email;
            passwordError.innerText = data.errors.password;
            return
        }
        //if there is the id, redirect
        console.log("qui", data);
            if(data.user) {
                location.assign("/chat");
            }
        }
    catch(err) {
        console.log(err);
    }
});