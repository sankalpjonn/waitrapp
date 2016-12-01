import React from 'react';
import Header from './../Header/';
import EmptyState from './../Orders/EmptyState.js';
import Live from './../Orders/Live.js';
import OrderStore from './../../stores/OrderStore';
import { getPendingOrders } from './../../actions/OrdersActions';
import { Config } from './../../../config';
import './BillOrders.scss';

export default class BillOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = { billRequestedOrders: OrderStore.getBillRequestedOrders() };

    this.onOrdersChange = this.onOrdersChange.bind(this);
  }

  componentWillMount() {
    getPendingOrders();
    this.setState({
      pollIntervalId: setInterval(getPendingOrders, Config.POLL_INTERVAL),
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
      billRequestedOrders: OrderStore.getBillRequestedOrders(),
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="bill-orders">
          <div className="bill-orders__list">
           {
             this.state.billRequestedOrders.length > 0 ?
                (
                  this.state.billRequestedOrders.map((order, index) =>
                    <Live key={index} order={order} />
                  )
                ) :
               <EmptyState message="No bills requested yet" />
           }
          </div>
        </div>
      </div>
    );
  }
}
