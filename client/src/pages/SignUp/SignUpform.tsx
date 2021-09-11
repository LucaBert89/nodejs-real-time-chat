import React, {useState} from 'react';
import IError from "../../interfaces/formErrors"
import IForm from "../../interfaces/formInterface"




function Form () {
    //state for input fields and errors
    const [user, setUser] = useState<IForm>({username: "", email: "", password: "", confirmPassword: ""})
    const [error, setError] = useState<IError>({usernameError: "", emailError: "", passwordError:""})

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()

    try{
        const {username, email, password, confirmPassword} = user;
        
        //checking if the passwords match before signup request
        if(password !== confirmPassword) {
           setError({usernameError: "", emailError: "", passwordError:"password doesn't match"});
           return 
        }
        const res = await fetch("/api/signup", {
            method: "Post",
            body: JSON.stringify({username: username, email: email, password: password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // fetch response take data or error
        const data = await res.json();

        //if inside data there is an errors key than set the Error coming from errorHandling
        if(data.errors) {
            setError({usernameError: data.errors.username, emailError: data.errors.email, passwordError:data.errors.password});
            
            return
        }
        //if there is an ID than the login was succesful
        if(data._id) {
            window.location.assign("https://real-chat-app-l.herokuapp.com/login");
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
            <form onSubmit={handleSubmit} className="form-app-container__data-form"> 
            
            <div className="signup-form__username">
                   
                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder="Username" name="username" onChange={e => setUser({...user, username: e.target.value})} value={user.username}></input>
                    <div className="signup-form__username-error error">{error.usernameError}</div>
                </div>
                <div className="signup-form__email">
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Email" name="email" onChange={e => setUser({...user, email: e.target.value})} value={user.email}></input>
                    <div className="signup-form__email-error error">{error.emailError}</div>
                </div>
                <div className="signup-form__password">
                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" onChange={e => setUser({...user, password: e.target.value})} value={user.password}></input>
                    <div className="signup-form__password-error error">{error.passwordError}</div>
                </div>
                <div className="signup-form__confirm-password">
                    <label htmlFor="password"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Enter Password" name="confirm-password" onChange={e => setUser({...user, confirmPassword: e.target.value})} value={user.confirmPassword}></input>
                    <div className="signup-form__password-error error">{error.passwordError}</div>
                </div>
                <button type="submit">Signup</button>
                <button type="submit"><a href="login">Login</a></button>
            </form>
            
        </main>
        </div>
    );
  }
  
  export default Form;