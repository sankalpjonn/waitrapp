import React from 'react';
import { setRestaurant } from './../../actions/AppActions';
import { getDetails } from './../../actions/RestaurantActions';
import RestaurantStore from './../../stores/RestaurantStore';
import BgImg from './../../public/images/bg.jpg';
import './app.scss';

export default function App({ children, params }) {
  // Set Restaurant
  setRestaurant(params.restaurantid);

  // Fetch details of restaurant
  const restaurantDetails = RestaurantStore.getDetails();
  if (!restaurantDetails.objectId) getDetails();

  return (
    <div className="customer-app" style={{ backgroundImage: `url(${BgImg})` }}>
      {children}
    </div>
  );
}

App.defaultProps = {
  children: [],
  params: {},
};

App.propTypes = {
  children: React.PropTypes.node,
  params: React.PropTypes.object,
};
