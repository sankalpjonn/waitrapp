import AppDispatcher from './../../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import CartStore from './CartStore';

const CHANGE_EVENT = 'change';

// Define store
const store = {
  items: [],
  categories: {},
  error: null,
};

class MenuStoreClass extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  }

  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }

  getItemsByCategory(category) {
    return store.categories[category].items;
  }

  getCategoriesList() {
    return Object.values(store.categories);
  }

  getError() {
    return store.error;
  }
}

// Initialize the singleton to register with the
// dispatcher and export for React components
const MenuStore = new MenuStoreClass();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'MENU_LIST_SUCCESS':
      store.items = action.result.result.items;
      store.categoriesArr = [];

      for (let i = 0, l = store.items.length; i < l; i++) {
        if (!store.categories[store.items[i].category]) {
          store.categories[store.items[i].category] = {
            items: [],
            expanded: false,
            name: store.items[i].category,
          };
        }

        store.categories[store.items[i].category].items.push(store.items[i]);
      }

      MenuStore.emit(CHANGE_EVENT);
      break;

    case 'MENU_LIST_FAILED': {
      store.items = [];
      store.error = action.error;
      MenuStore.emit(CHANGE_EVENT);
      break;
    }

    case 'TOGGLE_CATEGORY_VISIBILITY': {
      const categories = Object.values(store.categories);

      for (let i = 0, l = categories.length; i < l; i++) {
        if (action.category.name === categories[i].name) {
          categories[i].expanded = !categories[i].expanded;
        } else {
          categories[i].expanded = false;
        }
      }
      MenuStore.emit(CHANGE_EVENT);
      break;
    }

    case 'CART_ITEM_ADDED':
      AppDispatcher.waitFor([CartStore.dispatchToken]);
      MenuStore.emit(CHANGE_EVENT);
      break;

    case 'CART_ITEM_REMOVED':
      AppDispatcher.waitFor([CartStore.dispatchToken]);
      MenuStore.emit(CHANGE_EVENT);
      break;

    default:
      return true;
  }

  return true;
});

export default MenuStore;
