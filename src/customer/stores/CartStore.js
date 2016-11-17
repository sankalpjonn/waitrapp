import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  items: [],
  quantity: {},
};

class CartStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getItems() {
    const items = [];
    for (let i = 0, l = store.items.length; i < l; i++) {
      items.push(Object.assign({
        quantity: store.quantity[store.items[i].objectId],
      }, store.items[i]));
    }
    return items;
  }

  getItemById(id) {
    for (let i = 0, l = store.items.length; i < l; i++) {
      if (id === store.items[i].objectId) {
        return Object.assign({ quantity: store.quantity[id] }, store.items[i]);
      }
    }

    return {};
  }

  getItemsCount() {
    const quantities = Object.values(store.quantity);
    if (!quantities || !quantities.length) return 0;
    return quantities.reduce((previousValue, currentValue) => previousValue + currentValue) || 0;
  }

  getQuantityByItemId(id) {
    return store.quantity[id];
  }

  getItemCustomizationsByItemId(id) {
    const customizations = store.items.filter((item) =>
       item.objectId === id
    );
    return customizations[0].itemCustomizations;
  }
}

// Initialize the singleton to register with the
// dispatcher and export for React components
const CartStore = new CartStoreClass();

CartStore.dispatchToken = AppDispatcher.register((action) => {
  // let selectedItemObjectId;
  switch (action.actionType) {
    case 'CART_ITEM_ADDED':
      // Check if item is already present in quantities object, if not add it
      if (!store.quantity[action.item.objectId]) store.quantity[action.item.objectId] = 1;
      else store.quantity[action.item.objectId]++;

      // Check if item is in cart or not
      for (let i = 0, l = store.items.length; i < l; i++) {
        if (action.item.objectId === store.items[i].objectId) {
          return;
        }
      }
      store.items.push(action.item);

      CartStore.emit(CHANGE_EVENT);
      break;

    case 'CART_ITEM_REMOVED':
      // If item is in quantities object
      if (store.quantity[action.item.objectId]) {
        store.quantity[action.item.objectId]--;
      } else {
        return;
      }

      // In case the quantity is 0, remove item from cart
      if (!store.quantity[action.item.objectId]) {
        for (let i = 0, l = store.items.length; i < l; i++) {
          if (action.item.objectId === store.items[i].objectId) {
            store.items.splice(i, 1);
            break;
          }
        }
      }

      CartStore.emit(CHANGE_EVENT);
      break;

    case 'CART_ITEM_CUSTOMIZED':
      for (let i = 0, l = store.items.length; i < l; i++) {
        if (action.item.objectId === store.items[i].objectId &&
        !store.items[i].hasOwnProperty('itemCustomizations')) {
          store.items[i].itemCustomizations = [];
          store.items[i].itemCustomizations.push(action.details);
          store.items[i].itemCustomizations.customizationQuantity = 1;
          /* if (!store.items[i].hasOwnProperty('itemCustomizations')) {
            store.items[i].itemCustomizations = [];
            store.items[i].itemCustomizations.push(action.details);
          } else {
            store.items[i].itemCustomizations.push(action.details);
          } */
          // Object.assign(store.items[i].itemCustomizations, action.details);
          break;
        } else if (action.item.objectId === store.items[i].objectId &&
        store.items[i].hasOwnProperty('itemCustomizations')) {
          store.items[i].itemCustomizations.push(action.details);
        }
      }
      // store.items[selectedItemObjectId].itemCustomizations= [];
      // store.items[selectedItemObjectId].itemCustomizations.push(action.details);
      CartStore.emit(CHANGE_EVENT);
      break;

    case 'REMOVE_CUSTOMIZATION':
      CartStore.emit(CHANGE_EVENT);
      break;

    default:
      return;
  }
});

export default CartStore;
