import React from 'react';
import RestaurantStore from './../../stores/RestaurantStore';
import './Header.scss';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurant: RestaurantStore.getDetails(),
    };

    this.onRestaurantChange = this.onRestaurantChange.bind(this);
  }

  componentDidMount() {
    RestaurantStore.addChangeListener(this.onRestaurantChange);
  }

  componentWillUnmount() {
    RestaurantStore.removeChangeListener(this.onRestaurantChange);
  }

  onRestaurantChange() {
    this.setState({
      restaurant: RestaurantStore.getDetails(),
    });
  }

  render() {
    return (
      <div className="header-div">
        <h3>{this.state.restaurant.name}</h3>
        <p>{this.state.restaurant.description}</p>
      </div>
    );
  }
}
