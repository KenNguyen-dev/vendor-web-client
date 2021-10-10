import React from "react";
import "./App.css";
import Sidenav from "./Compoments/Sidenav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShopInfo from "./Compoments/ShopInfo";
import Products from "./Compoments/Products";
function App() {
  return (
    <div className="App">
      <Router>
        <Sidenav>
          <Switch>
            <Route exact path="/" component={ShopInfo} />
            <Route path="/products" component={Products} />
          </Switch>
        </Sidenav>
      </Router>
    </div>
  );
}

export default App;
