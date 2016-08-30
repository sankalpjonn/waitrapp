import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  order: {},
  statusCode: null,
  error: null,
};

class OrderStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getOrderDetails() {
    return store.order;
  }

  getStatusCode() {
    return store.statusCode;
  }

  getError() {
    return store.error;
  }
}

// Initialize the singleton to register with the
// dispatcher and export for React components
const OrderStore = new OrderStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'SAVE_ORDER_DETAILS':
      Object.assign(store.order, action.details);
      OrderStore.emit(CHANGE_EVENT);
      break;

    case 'ORDER_PLACE_SUCCESS':
      store.order = action.response;
      store.statusCode = action.statusCode;
      store.error = null;
      OrderStore.emit(CHANGE_EVENT);
      break;

    case 'ORDER_PLACE_FAIL':
      store.error = action.error;
      store.order = {};
      OrderStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }

  return true;
});

export default OrderStore;
