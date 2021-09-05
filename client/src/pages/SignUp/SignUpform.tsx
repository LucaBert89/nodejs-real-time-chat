import React, {useState} from 'react';
import {Redirect} from "react-router-dom"

interface IForm {
    email: string;
    password: string;
    confirmPassword:string;
}

interface IError {
    emailError: string,
    passwordError: string
}

function Form () {
    const [user, setUser] = useState<IForm>({email: "", password: "", confirmPassword: ""})
    const [error, setError] = useState<IError>({emailError: "", passwordError:""})
/*
    e.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    //reset error handling values
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
        // fetch response take data or error
        const data = await res.json();
        //if inside data there is an errors obj
        if(data.errors) {
            emailError.innerText = data.errors.email;
            passwordError.innerText = data.errors.password;
            return
        }
        //if there is the id, redirect
        if(data._id) {
            location.assign("/login");
        }
    }
    catch(err) {
        console.log(err);
    }
    */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

    try{
        const {email, password, confirmPassword} = user;
        if(password !== confirmPassword) {
           setError({emailError: "email doesn't match", passwordError:""});
           return 
        }
        const res = await fetch("http://localhost:5000/signup", {
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
        if(data._id) {
            window.location.assign("http://localhost:3000/login");
        }
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
            <form onSubmit={handleSubmit} className="login-app-container__signup-form"> 
                <div className="signup-form__email">
                    <label htmlFor="email"><b>Username</b></label>
                    <input type="text" placeholder="Email" name="email" required onChange={e => setUser({...user, email: e.target.value})} value={user.email}></input>
                    <div className="signup-form__email-error">{error.emailError}</div>
                </div>
                <div className="signup-form__password">
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required onChange={e => setUser({...user, password: e.target.value})} value={user.password}></input>
                    <div className="signup-form__password-error">{error.passwordError}</div>
                </div>
                <div className="signup-form__confirm-password">
                    <label htmlFor="password"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Enter Password" name="confirm-password" required onChange={e => setUser({...user, confirmPassword: e.target.value})} value={user.confirmPassword}></input>
                    <div className="signup-form__password-error">{error.passwordError}</div>
                </div>
                <button type="submit">Signup</button>
            </form>
            <button type="submit"><a href="login">Login</a></button>
        </main>
        </div>
    );
  }
  
  export default Form;