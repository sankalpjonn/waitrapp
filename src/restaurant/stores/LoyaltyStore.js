import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

const store = {
  phoneNumber: '',
  credit: '',
  debit: '',
  error: null,
};

class LoyaltyStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getCredit() {
    return store.credit;
  }

  getDebit() {
    return store.debit;
  }

  getError() {
    return store.error;
  }
}

const LoyaltyStore = new LoyaltyStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'SAVE_PHONE_NUMBER':
      store.phoneNumber = action.details;
      LoyaltyStore.emit(CHANGE_EVENT);
      break;

    case 'STATEMENT_SUCCESS':
      if (action.result.loyaltyData !== undefined) {
        store.credit = action.result.loyaltyData.totalCredit;
        store.debit = action.result.loyaltyData.totalDebit;
        LoyaltyStore.emit(CHANGE_EVENT);
      }
      break;

    case 'STATEMENT_FAILED':
      store.phoneNumber = '';
      store.credit = '';
      store.debit = '';
      store.error = action.error;
      LoyaltyStore.emit(CHANGE_EVENT);
      break;

    case 'DEBIT_SUCCESS':
      store.phoneNumber = '';
      store.credit = '';
      store.debit = '';
      store.error = null;
      LoyaltyStore.emit(CHANGE_EVENT);
      break;

    case 'DEBIT_FAILED':
      store.phoneNumber = '';
      store.credit = '';
      store.debit = '';
      store.error = action.error;
      LoyaltyStore.emit(CHANGE_EVENT);
      break;

    case 'CREDIT_SUCCESS':
      store.phoneNumber = '';
      store.credit = '';
      store.debit = '';
      store.error = null;
      LoyaltyStore.emit(CHANGE_EVENT);
      break;

    case 'CREDIT_FAILED':
      store.phoneNumber = '';
      store.credit = '';
      store.debit = '';
      store.error = action.error;
      LoyaltyStore.emit(CHANGE_EVENT);
      break;

    default:
      return;
  }
});
