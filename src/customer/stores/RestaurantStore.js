import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  id: null,
  details: {},
  error: null,
};

class RestaurantStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getRestaurantID() {
    return store.id;
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
const RestaurantStore = new RestaurantStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'RESTAURANT_DETAILS_SUCCESS':
      store.details = action.result;

      RestaurantStore.emit(CHANGE_EVENT);
      break;

    case 'RESTAURANT_DETAILS_FAILED':
      store.details = {};
      store.error = action.error;
      RestaurantStore.emit(CHANGE_EVENT);
      break;

    case 'SET_RESTAURANT':
      store.id = action.restaurantid;
      RestaurantStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }

  return true;
});

export default RestaurantStore;
