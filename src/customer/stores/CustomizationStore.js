import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  customizations: {},
  error: null,
};

class CustomizationStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getCustomizationByItemId(id) {
    return store.customizations[id] || [];
  }
}

// Initialize the singleton to register with the
// dispatcher and export for React components
const CustomizationStore = new CustomizationStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'MENU_LIST_SUCCESS':
      store.customizations = action.result.result.customizations;
      CustomizationStore.emit(CHANGE_EVENT);
      break;

    case 'MENU_LIST_FAILED': {
      store.customizations = {};
      store.error = action.error;
      CustomizationStore.emit(CHANGE_EVENT);
      break;
    }

    default:
      return true;
  }

  return true;
});

export default CustomizationStore;
