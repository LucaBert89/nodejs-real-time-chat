import './App.css';
import {  BrowserRouter as Router,
  Switch,
  Route } from "react-router-dom"
import Login from "./component/Loginform"
import Home from "./component/Home"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <Router>
      <Switch>
        <Route exact path="/login"><Login></Login></Route> 
        <Route exact path="/home"><Home></Home></Route> 
      </Switch>
      </Router>

    </div>
  );
}

export default App;
