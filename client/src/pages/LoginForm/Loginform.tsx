import React, {useState} from 'react';
import IError from "../../interfaces/formErrors"

interface IForm {
    username:string,
    email: string,
    password: string
}



const Form: React.FC  = () => {
    localStorage.removeItem("userId")
    const [user, setUser] = useState<IForm>({username:"", email: "", password: ""})
    const [error, setError] = useState<IError>({usernameError:"", emailError: "", passwordError:""})

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

    try{
        const {username, email, password} = user;

        const res = await fetch("http://localhost:5000/login", {
            method: "Post",
            body: JSON.stringify({username: username, email: email, password: password}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
        // fetch response take data or error
        const data = await res.json();

        //if inside data there is an errors obj
        if(data.errors) {
            setError({usernameError: data.errors.username, emailError: data.errors.email, passwordError:data.errors.password});
            console.log("okok", error);
            return
        }
        console.log(data.user);
        localStorage.setItem("userId", data.user)
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
            <div className="login-form__username">
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder="username" name="username" required onChange={e => setUser({...user, username: e.target.value})} value={user.username}></input>
                    <div className="login-form__email-error">{error.usernameError}</div>
                </div>
                <div className="login-form__email">
                    <label htmlFor="email"><b>Email</b></label>
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
    );
  }
  
  export default Form;