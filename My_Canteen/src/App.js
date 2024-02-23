import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import FoodItems from './FoodItems';
import CartPage from './CartPage';
import YourOrders from './YourOrders'; // Import the YourOrders component

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/fooditems" component={FoodItems} />
        <Route path="/cart" component={CartPage} />
        <Route path="/yourorders" component={YourOrders} /> {/* Add this route for YourOrders component */}
      </Switch>
    </Router>
  );
}

export default App;
