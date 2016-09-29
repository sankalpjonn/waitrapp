import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import OrderButtons from './OrderButtons';
import { requestBill, rateItem, placeOrder } from './../../actions/OrderActions';
import OrderStore from './../../stores/OrderStore';
import CartStore from './../../stores/CartStore';
import BillStore from './../../stores/BillStore';
import RestaurantStore from './../../stores/RestaurantStore';
import Rating from './Rating.js';
import BillRequested from './BillRequested.js';
import './OrderDetails.scss';

export default class ordercard extends React.Component {
  constructor(props) {
    super(props);

    const order = OrderStore.getOrderDetails();

    this.state = {
      order,
      items: CartStore.getItems(),
      paymentMode: 'cash',
      isBillRequested: false,
      buttonVisibility: true,
      actionVisibility: false,
    };

    this.onPaymentModeChange = this.onPaymentModeChange.bind(this);
    this.onRequestBillClick = this.onRequestBillClick.bind(this);
    this.onBillChange = this.onBillChange.bind(this);
    this.onConfirmOrderClick = this.onConfirmOrderClick.bind(this);
    this.onOrderChange = this.onOrderChange.bind(this);
  }

  onPaymentModeChange(mode) {
    this.setState({
      paymentMode: mode,
    });
  }

  onBillChange() {
    BillStore.removeChangeListener(this.onBillChange);

    if (BillStore.getStatusCode() === 200 && !BillStore.getError()) {
      this.setState({
        isBillRequested: true,
      });
    } else {
      alert('Unable to request bill.');
    }
  }

  onRequestBillClick() {
    BillStore.addChangeListener(this.onBillChange);

    requestBill(this.state.order, this.state.paymentMode);
  }

  onItemRatingChange(item) {
    return (rating) => {
      rateItem({
        item,
        rating,
        tableNumber: this.state.order.tableNumber,
      });
    };
  }

  onConfirmOrderClick() {
    const itemsDetails = CartStore.getItems();
    const items = [];

    // Do some data formatting
    for (let i = 0, l = itemsDetails.length; i < l; i++) {
      items.push({
        itemId: itemsDetails[i].objectId,
        itemName: itemsDetails[i].name,
        itemQuantity: itemsDetails[i].quantity,
        itemCustomizations: itemsDetails[i].itemCustomizations,
      });
    }

    // Listen for order change events
    OrderStore.addChangeListener(this.onOrderChange);

    this.setState({
      isOrderInProgress: true,
    });

    // Place order
    placeOrder({
      tableNumber: this.state.order.tableNumber,
      comments: this.state.order.comments,
      items,
    });
  }

  onOrderChange() {
    OrderStore.removeChangeListener(this.onOrderChange);

    if (OrderStore.getStatusCode() === 201) {
      // Success
      this.setState({
        isOrderInProgress: false,
        buttonVisibility: false,
        actionVisibility: true,
        order: OrderStore.getOrderDetails(),
      });
    } else {
      this.setState({
        isOrderInProgress: false,
      });
      alert('Unable to place order');
    }
  }

  getDisplayTime(timestamp) {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  render() {
    let subtotal = 0;
    let totalItemsQuantity = 0;
    const items = this.state.items.map((item, index) => {
      subtotal += +item.price * +item.quantity;
      totalItemsQuantity += +item.quantity;
      return (
        <tr key={index}>
          <td className="name">
            {item.name}
            {
              this.state.isBillRequested ?
                <Rating onRatingChange={this.onItemRatingChange(item)} /> :
                undefined
            }
            {
              item.itemCustomizations ?
                <div className="label-customized">
                  <span>Customized</span>
                </div> :
                undefined
            }
          </td>
          <td className="price"><span className="price-symbol">`</span> {item.price}</td>
          <td className="quantity">x {item.quantity}</td>
        </tr>
      );
    });
    return (
      <div className="order-card">
        <div className="order-card__header">
          <div className="order-card__header__table-number">
            Table #{this.state.order.tableNumber}
          </div>
          <div className="order-card__header__time">
            {this.getDisplayTime(this.state.order.updatedAt)}
          </div>
        </div>
        <div className="order-card__body">
          <table className="order-card__body__items" cellSpacing="0" cellPadding="0">
            <tbody>
              {items}
              <tr>
                <td className="name">Subtotal</td>
                <td className="price"><span className="price-symbol">`</span> {subtotal}</td>
                <td className="quantity">{totalItemsQuantity}</td>
              </tr>
              <tr>
                <td className="name extra">VAT</td>
                <td className="price extra"><span className="price-symbol">`</span> 0</td>
                <td></td>
              </tr>
              <tr>
                <td className="name extra">Round Off</td>
                <td className="price extra">+<span className="price-symbol">`</span> 0</td>
                <td></td>
              </tr>
            </tbody>
            <tfoot className="total">
              <tr>
                <td className="name">Total</td>
                <td className="price"><span className="price-symbol">`</span> {subtotal}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          {
            !this.state.isBillRequested ?
            (
              <div className="order-card__body__add-more">
                <Link to={`/restaurant/${RestaurantStore.getRestaurantID()}`}>
                  + Order more items
                </Link>
              </div>
            ) :
            undefined
          }
          <div
            className={classnames('order-card__body__confirm-order', {
              hide: !this.state.buttonVisibility,
            })}
          >
            <button type="button" onClick={this.onConfirmOrderClick}>Confirm Order</button>
          </div>
          <div
            className={classnames('order-card__body__after-confirm', {
              hide: !this.state.actionVisibility,
            })}
          >
            {
              this.state.isBillRequested ?
              (
                <BillRequested mode={this.state.paymentMode} />
              ) :
              (
                <div>
                  <p className="order-card__req">Done with your meal?</p>
                  <OrderButtons
                    paymentMode={this.state.paymentMode}
                    onModeChange={this.onPaymentModeChange}
                    onRequestBillClick={this.onRequestBillClick}
                  />
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
