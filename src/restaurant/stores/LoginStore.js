import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  user: {},
  error: null,
};

class LoginStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getUserID() {
    return store.user.businessid;
  }

  getSessionToken() {
    return store.user.sessionToken;
  }

  getError() {
    return store.error;
  }
}

// Initialize the singleton to register with the
// dispatcher and export for React components
const LoginStore = new LoginStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'LOGIN_SUCCESS':
      store.user = action.user;
      LoginStore.emit(CHANGE_EVENT);
      break;

    case 'LOGIN_FAILED':
      store.user = {};
      store.error = action.error;
      LoginStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }

  return true;
});

export default LoginStore;
