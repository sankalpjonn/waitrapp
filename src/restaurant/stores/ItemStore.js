import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  items: {},
  itemsArr: [],
  error: null,
};

class ItemStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getItems() {
    return store.itemsArr;
  }

  getItemById(id) {
    return store.items[id] || {};
  }

  getError() {
    return store.error;
  }
}

// Initialize the singleton to register with the
// dispatcher and export for React components
const ItemStore = new ItemStoreClass();

ItemStore.dispatchToken = AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'ITEMS_LIST_SUCCESS':
      store.itemsArr = action.result.result.items;
      if (!store.itemsArr) store.itemsArr = [];

      for (let i = 0, l = store.itemsArr.length; i < l; i++) {
        store.items[store.itemsArr[i].objectId] = store.itemsArr[i];
      }
      ItemStore.emit(CHANGE_EVENT);
      break;

    case 'ITEMS_LIST_FAIL':
      store.itemsArr = [];
      store.items = {};
      store.error = action.error;
      ItemStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }

  return true;
});

export default ItemStore;
