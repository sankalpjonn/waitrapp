import React from 'react';
import Header from './../Header/';
import EmptyState from './../Orders/EmptyState.js';
import Live from './../Orders/Live.js';
import OrderStore from './../../stores/OrderStore';
import { getPendingOrders } from './../../actions/OrdersActions';
import { Config } from './../../../config';
import './LiveOrders.scss';

export default class LiveOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newOrders: OrderStore.getReceivedOrders().concat(OrderStore.getProcessingOrders()),
      // billRequestedOrders: OrderStore.getBillRequestedOrders(),
    };

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
      newOrders: OrderStore.getReceivedOrders().concat(OrderStore.getProcessingOrders()),
      // billRequestedOrders: OrderStore.getBillRequestedOrders(),
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="live-orders">
          <div className="live-orders__new-orders">
            <div className="live-orders__new-orders__contain">
              {
                this.state.newOrders.length > 0 ?
                  (
                    this.state.newOrders.map((order, index) => <Live key={index} order={order} />)
                  ) :
                  <EmptyState />
              }
            </div>
          </div>
          {/*
          <div className="live-orders__bill-requested">
            <h6 className="live-orders__bill-requested__head">Bill Requested</h6>
            <div className="live-orders__bill-requested__contain">
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
          */}
        </div>
      </div>
    );
  }
}
