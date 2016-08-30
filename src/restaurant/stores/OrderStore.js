import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  orders: [],
  received: [],
  processing: [],
  billRequested: [],
  completed: [],
  error: null,
};

class OrderStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getOrders() {
    return store.orders;
  }

  getReceivedOrders() {
    return store.received;
  }

  getProcessingOrders() {
    return store.processing;
  }

  getBillRequestedOrders() {
    return store.billRequested;
  }

  getCompletedOrders() {
    return store.completed;
  }

  getError() {
    return store.error;
  }
}

class OrderManipulationsClass {
  distributeOrders() {
    // Cleanup
    store.received = [];
    store.processing = [];
    store.billRequested = [];
    store.completed = [];

    for (let i = 0, l = store.orders.length; i < l; i++) {
      switch (store.orders[i].status) {
        case 0:
          store.received.push(store.orders[i]);
          break;

        case 1:
          store.processing.push(store.orders[i]);
          break;

        case 2:
          store.billRequested.push(store.orders[i]);
          break;

        case 3:
          store.completed.push(store.orders[i]);
          break;

        default:
          break;
      }
    }

    return true;
  }
}

const OrderManipulations = new OrderManipulationsClass();

// Initialize the singleton to register with the
// dispatcher and export for React components
const OrderStore = new OrderStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'ORDERS_LIST_SUCCESS':
      store.orders = action.result.result.orders;
      if (!store.orders) store.orders = [];

      OrderManipulations.distributeOrders();
      OrderStore.emit(CHANGE_EVENT);
      break;

    case 'ORDERS_LIST_FAILED':
      store.orders = {};
      store.error = action.error;
      OrderStore.emit(CHANGE_EVENT);
      break;

    case 'ORDER_COMPLETE_SUCCESS':
      for (let i = 0, l = store.orders.length; i < l; i++) {
        if (action.order.objectId === store.orders[i].objectId) {
          store.orders[i].status = action.result.status;
          store.orders[i].updatedAt = action.result.updatedAt;
          break;
        }
      }
      OrderManipulations.distributeOrders();
      OrderStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }

  return true;
});

export default OrderStore;
