import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/dashboard";
import Profile from "./pages/profile";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
