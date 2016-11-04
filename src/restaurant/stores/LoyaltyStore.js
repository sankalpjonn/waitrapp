import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

const store = {};

class LoyaltyStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
}

const LoyaltyStore = new LoyaltyStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'SAVE_LOYALTY_DETAILS':
      Object.assign(store, action.details);
      LoyaltyStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }

  return true;
});

export default LoyaltyStore;
