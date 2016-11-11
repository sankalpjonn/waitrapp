import React from 'react';
import Right from './../../public/images/right.svg';
import './Orders.scss';

export default function Complete({ order }) {
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

  const orderItemsWithCustomizations = order.orderData.filter(item =>
     item.hasOwnProperty('itemCustomizations')
  );

  const orderItemsWithoutCustomizations = order.orderData.filter(item =>
    !item.hasOwnProperty('itemCustomizations')
  );

  return (
    <div className="order">
      <div className="order__header">
        <div className="order__header__time">{getDisplayTime(order.createdAt)}</div>
        <div className="row">
          <div className="order__header__order-number">Order #{order.objectId}</div>
          <div className="order__header__table-number">Table #{order.tableNumber}</div>
        </div>
      </div>
      <div className="order__body">
        <table className="order__body__items">
          {
            orderItemsWithCustomizations.map((item, index) =>
              <tbody>
                <tr key={index}>
                  <td>{item.itemQuantity}</td>
                  <td>x</td>
                  <td>{item.itemName}</td>
                  <td>{item.itemCustomizations['Stick Addon']}</td>
                  <td>{item.itemCustomizations.comments}</td>
                </tr>
              </tbody>
            )
          }
          {
            orderItemsWithoutCustomizations.map((item, index) =>
              <tbody>
                <tr key={index}>
                  <td>{item.itemQuantity}</td>
                  <td>x</td>
                  <td>{item.itemName}</td>
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
        <div className="order__body__payment-mode">
          <div className="mode">
            {
              order.paymentMode === 'cash' ?
                <span>Paid By Cash</span> :
                <span>Paid By Card</span>
            }
          </div>
        </div>
        <div className="order__body__complete-time">
          <div className="time">
            <img src={Right} role="presentation" width={15} />
            Order complete at {getDisplayTime(order.updatedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

Complete.propTypes = {
  order: React.PropTypes.object.isRequired,
};
