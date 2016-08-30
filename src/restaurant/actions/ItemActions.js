import AppDispatcher from './../../dispatcher/AppDispatcher';
import { list } from './../WebAPIUtils/items';

export function getItems() {
  // Call method to fetch list using API
  list();
}

export function listSuccess(result) {
  AppDispatcher.dispatch({
    actionType: 'ITEMS_LIST_SUCCESS',
    result,
  });
}

export function listFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'ITEMS_LIST_FAIL',
    error,
  });
}
