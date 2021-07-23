const form = document.querySelector(".login-app-container__signup-form");

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    /*const data = {
        "email": email,
        "password":password,
    }
    try {
        const res = await fetch("http://localhost:3000/signup", {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        })  
        return res.json();; 
    }
    catch(err) {
        console.log(err);
    }  */
})