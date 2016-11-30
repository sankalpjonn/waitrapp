import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import { getDetails } from './../../actions/BusinessActions';
import BusinessStore from './../../stores/BusinessStore';
import './Header.scss';

export default class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { business: BusinessStore.getDetails() };

    this.onBusinessChange = this.onBusinessChange.bind(this);
    this.onLiveOrdersClick = this.onLiveOrdersClick.bind(this);
    this.onBillOrdersClick = this.onBillOrdersClick.bind(this);
    this.onCompletedOrdersClick = this.onCompletedOrdersClick.bind(this);
    this.isRouteActive = this.isRouteActive.bind(this);
  }

  componentDidMount() {
    BusinessStore.addChangeListener(this.onBusinessChange);
    // Fetch details of business
    getDetails();
  }

  componentWillUnmount() {
    BusinessStore.removeChangeListener(this.onBusinessChange);
  }

  onBusinessChange() {
    this.setState({
      business: BusinessStore.getDetails(),
    });
  }

  onLiveOrdersClick() {
    this.context.router.push('/business/orders');
  }

  onBillOrdersClick() {
    this.context.router.push('business/bills');
  }

  onCompletedOrdersClick() {
    this.context.router.push('/business/completed');
  }

  isRouteActive(path) {
    return !!this.context.router.isActive(path);
  }

  render() {
    return (
      <header className="header">
        <h4 className="header__logo">{this.state.business.name}</h4>
        <div className="header__menu">
          <div
            className={classnames('header__menu__live-orders', {
              'header__menu--active': this.isRouteActive('/business/orders'),
            })}
            onClick={this.onLiveOrdersClick}
          >
            Live Orders
          </div>
          <div
            className={classnames('header__menu__bill-orders', {
              'header__menu--active': this.isRouteActive('/business/bills'),
            })}
            onClick={this.onBillOrdersClick}
          >
            Bill Orders
          </div>
          <div
            className={classnames('header__menu__completed-orders', {
              'header__menu--active': this.isRouteActive('/business/completed'),
            })}
            onClick={this.onCompletedOrdersClick}
          >
            Completed Orders
          </div>
        </div>
        <div className="header__logout">
          <Link to="/business/logout">Logout</Link>
        </div>
      </header>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
