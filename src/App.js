import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pokemon from "./Components/Pokemon";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Pokemon />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
