import './App.css';
import {  BrowserRouter as Router,
  Switch,
  Route } from "react-router-dom"
import Login from "./pages/LoginForm/Loginform"
import SignUp from "./pages/SignUp/SignUpform"
import Home from "./pages/Home/Home"
import Room from "./pages/Room/Room"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <Router>
      <Switch>
        <Route exact path="/login"><Login></Login></Route> 
        <Route exact path="/signup"><SignUp></SignUp></Route>
        <Route exact path="/"><Home></Home></Route> 
        <Route exact path="/chat/:id"><Room></Room></Route>
      </Switch>
      </Router>

    </div>
  );
}

export default App;
