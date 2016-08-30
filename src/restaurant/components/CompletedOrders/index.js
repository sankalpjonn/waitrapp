import React from 'react';
import Header from './../Header/';
import Complete from './../Orders/Complete.js';
import EmptyState from './../Orders/EmptyState.js';
import { getCompletedOrders } from './../../actions/OrdersActions';
import OrderStore from './../../stores/OrderStore';
import { Config } from './../../../config';
import './CompletedOrders.scss';

export default class CompletedOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = { completed: OrderStore.getCompletedOrders() };

    this.onOrdersChange = this.onOrdersChange.bind(this);
  }

  componentWillMount() {
    getCompletedOrders();
    this.setState({
      pollIntervalId: setInterval(getCompletedOrders, Config.POLL_INTERVAL),
    });
  }

  componentDidMount() {
    OrderStore.addChangeListener(this.onOrdersChange);
  }

  componentWillUnmount() {
    clearInterval(this.state.pollIntervalId);
    OrderStore.removeChangeListener(this.onOrdersChange);
  }

  onOrdersChange() {
    this.setState({
      completed: OrderStore.getCompletedOrders(),
    });
  }

  render() {
    const getDisplayDate = (timestamp) => {
      const monthName = [
        'January', 'February', 'March',
        'April', 'May', 'June',
        'July', 'August', 'September',
        'October', 'November', 'December',
      ];
      const dateFull = new Date(timestamp);
      const date = dateFull.getDate();
      const month = dateFull.getMonth();
      const year = dateFull.getFullYear();
      return `${date} ${monthName[month]}, ${year}`;
    };

    return (
      <div>
        <Header />
        <div className="completed-orders">
          <div className="completed-orders__list">
            {
              this.state.completed.length > 0 ?
                (
                  this.state.completed.map((order, index) =>
                    <div className="completed-orders__list__order order" key={index}>
                      <div className="order__date">{getDisplayDate(order.createdAt)}</div>
                      <Complete order={order} />
                    </div>
                  )
                ) :
                <EmptyState message="No completed orders yet" />
            }
          </div>
        </div>
      </div>
    );
  }
}
