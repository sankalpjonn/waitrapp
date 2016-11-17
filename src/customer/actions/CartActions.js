import AppDispatcher from './../../dispatcher/AppDispatcher';

export function addItem(item) {
  AppDispatcher.dispatch({
    actionType: 'CART_ITEM_ADDED',
    item,
  });
}

export function removeItem(item) {
  AppDispatcher.dispatch({
    actionType: 'CART_ITEM_REMOVED',
    item,
  });
}

export function customizeItem(item, details) {
  AppDispatcher.dispatch({
    actionType: 'CART_ITEM_CUSTOMIZED',
    item,
    details,
  });
}
export function removeCustomization(item, details) {
  AppDispatcher.dispatch({
    actionType: 'REMOVE_CUSTOMIZATION',
    item,
    details,
  });
}
