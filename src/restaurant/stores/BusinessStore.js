import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  details: {},
  error: null,
};

class BusinessStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getDetails() {
    return store.details;
  }

  getError() {
    return store.error;
  }
}

// Initialize the singleton to register with the
// dispatcher and export for React components
const BusinessStore = new BusinessStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'BUSINESS_DETAILS_SUCCESS':
      store.details = action.result;

      BusinessStore.emit(CHANGE_EVENT);
      break;

    case 'BUSINESS_DETAILS_FAILED':
      store.details = {};
      store.error = action.error;
      BusinessStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }

  return true;
});

export default BusinessStore;
