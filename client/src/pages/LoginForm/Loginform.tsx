import React, {useState} from 'react';
import IError from "../../interfaces/formErrors"
import IForm from "../../interfaces/formInterface"



const Form: React.FC  = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("username");
    const [user, setUser] = useState<IForm>({username:"", email: "", password: ""})
    const [error, setError] = useState<IError>({usernameError:"", emailError: "", passwordError:""})

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

    try{
        const {username, email, password} = user;

        const res = await fetch("https://real-chat-app-l.herokuapp.com/api/login", {
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
            console.log(data.errors);
            setError({usernameError: data.errors.username, emailError: data.errors.email, passwordError:data.errors.password});
            return
        }

        localStorage.setItem("userId", data.user)
        localStorage.setItem("username", username)
        if(data.user) window.location.assign("https://real-chat-app-l.herokuapp.com/");
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
            <form onSubmit={handleSubmit} className="form-app-container__data-form"> 
                <div className="login-form__username">
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder="username" name="username" required onChange={e => setUser({...user, username: e.target.value})} value={user.username}></input>
                    <div className="login-form__email-error error">{error.usernameError}</div>
                </div>
                <div className="login-form__email">
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Email" name="email" required onChange={e => setUser({...user, email: e.target.value})} value={user.email}></input>
                    <div className="login-form__email-error error">{error.emailError}</div>
                </div>
                <div className="login-form__password">
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required onChange={e => setUser({...user, password: e.target.value})} value={user.password}></input>
                    <div className="login-form__password-error error">{error.passwordError}</div>
                </div>
                <button type="submit">Login</button>
                <button type="submit"><a href="signup">Signup</a></button>
            </form>
           
        </main>
        </div>
    );
  }
  
  export default Form;