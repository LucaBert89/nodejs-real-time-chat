import React, {useState} from 'react';
import {Redirect} from "react-router-dom"

interface IForm {
    email: string;
    password: string;
}

interface IError {
    emailError: string,
    passwordError: string
}

function Form () {
    const [user, setUser] = useState<IForm>({email: "", password: ""})
    const [error, setError] = useState<IError>({emailError: "", passwordError:""})

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

    try{
        const {email, password} = user;

        const res = await fetch("http://localhost:5000/login", {
            method: "Post",
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
        // fetch response take data or error
        const data = await res.json();

        //if inside data there is an errors obj
        if(data.errors) {
            setError({emailError: data.errors.email, passwordError:data.errors.password});
            console.log("okok", error);
            return
        }
        if(data.user) window.location.assign("http://localhost:3000/home");
        //if there is the id, redirect
            //if(data.user) {location.assign("/chat");}
        }
    catch(err) {
        console.log(err);
    }
    
    }

    return (
        <div>
        <main className="login-app-container">
            <form onSubmit={handleSubmit} className="login-app-container__login-form"> 
                <div className="login-form__email">
                    <label htmlFor="email"><b>Username</b></label>
                    <input type="text" placeholder="Email" name="email" required onChange={e => setUser({...user, email: e.target.value})} value={user.email}></input>
                    <div className="login-form__email-error">{error.emailError}</div>
                </div>
                <div className="login-form__password">
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required onChange={e => setUser({...user, password: e.target.value})} value={user.password}></input>
                    <div className="login-form__password-error">{error.passwordError}</div>
                </div>
                <button type="submit">Login</button>
            </form>
            <button type="submit"><a href="signup">Signup</a></button>
        </main>
        </div>
      /*<main className="login-app-container">
        <form class="login-app-container__login-form">
            <div class="login-form__email">
                <label for="email"><b>Username</b></label>
                <input type="text" placeholder="Email" name="email" required>
                <div class="login-form__email-error"></div>
            </div>
            <div class="login-form__password">
                <label for="password"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" required>
                <div class="login-form__password-error"></div>
            </div>
            <button type="submit">Login</button>
        </form>
        <button type="submit"><a href="signup">Signup</a></button>
      </main>*/
    );
  }
  
  export default Form;