import React from 'react';
import BillRequested from './BillRequested';
import { completeOrder } from './../../actions/OrdersActions';
import './Orders.scss';

export default function Live({ order }) {
  const getDisplayTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="order">
      <div className="order__header">
        <div className="order__header__time">{getDisplayTime(order.updatedAt)}</div>
        <div className="row">
          <div className="order__header__order-number">Order #{order.objectId}</div>
          <div className="order__header__table-number">Table #{order.tableNumber}</div>
        </div>
      </div>
      <div className="order__body">
        <table className="order__body__items">
            {
              order.orderData.map((item, index) =>
                <tbody>
                  <tr key={index}>
                    <td>{item.itemQuantity}</td>
                    <td>x</td>
                    <td>{item.itemName}</td>
                  </tr>
                  <tr className="order__body__items__customization">
                    <td>{item.itemCustomizations['Stick Addon'].toString()},</td>
                    <td>{item.itemCustomizations.comments.toString()}</td>
                  </tr>
                </tbody>
              )
            }

        </table>
        {
          order.comments ?
            (
            <div className="order__body__comments comments">
              <h6 className="comments__heading">Comments</h6>
              <p className="comments__content">{order.comments}</p>
            </div>
            ) :
            undefined
        }
        <table className="order__body__extra-items order__body__items hide">
          <thead>
            <tr>
              <th className="order__body__items__heading">
                Additional Items Ordered
                <span className="notification-red icon-notification"></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>x</td>
              <td>All American Nachos</td>
            </tr>
          </tbody>
        </table>
        {
          order.status === 2 ?
            <BillRequested mode={order.paymentMode} /> :
            undefined
        }
        <div className="order__body__actions">
          <button
            type="button"
            className="button--success button--medium"
            onClick={() => completeOrder(order)}
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
}

Live.propTypes = {
  order: React.PropTypes.object.isRequired,
};
