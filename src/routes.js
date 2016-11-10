import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Customer
import CustomerApp from './customer/components/App';
import MenuCategories from './customer/components/MenuCategories';
import OrderDetails from './customer/components/OrderDetails';

// Restaurant
import RestaurantApp from './restaurant/components/App';
import Login from './restaurant/components/Login';
import LiveOrders from './restaurant/components/LiveOrders';
import CompletedOrders from './restaurant/components/CompletedOrders';
import Loyalty from './restaurant/components/Loyalty';

export default function Routes() {
  const doLogout = () => {
    if (localStorage.getItem('BUSINESS')) localStorage.removeItem('BUSINESS');
  };

  return (
    <Router history={hashHistory}>
      <Route path="/restaurant/:restaurantid" component={CustomerApp}>
        <IndexRoute component={MenuCategories} />
        <Route path="orders" component={OrderDetails} />
      </Route>
      <Route path="/business" component={RestaurantApp}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} />
        <Route path="logout" component={Login} onEnter={doLogout} />
        <Route path="orders" component={LiveOrders} />
        <Route path="completed" component={CompletedOrders} />
        <Route path="loyalty" component={Loyalty} />
      </Route>
    </Router>
  );
}
