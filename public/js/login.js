const form = document.querySelector(".login-app-container__login-form");

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
});