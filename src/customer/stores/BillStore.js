import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  bill: {},
  statusCode: null,
  error: null,
};

class BillStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getBillDetails() {
    return store.bill;
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
const BillStore = new BillStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'BILL_REQUEST_SUCCESS':
      store.bill = action.response;
      store.statusCode = action.statusCode;
      store.error = null;
      BillStore.emit(CHANGE_EVENT);
      break;

    case 'BILL_REQUEST_FAIL':
      store.error = action.error;
      store.bill = {};
      BillStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }

  return true;
});

export default BillStore;
