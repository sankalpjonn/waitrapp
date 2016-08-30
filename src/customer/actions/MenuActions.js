import AppDispatcher from './../../dispatcher/AppDispatcher';
import { list } from './../WebAPIUtils/menu';

export function getItems() {
  // Call method to fetch list using API
  list();
}

export function listSuccess(result) {
  AppDispatcher.dispatch({
    actionType: 'MENU_LIST_SUCCESS',
    result,
  });
}

export function listFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'MENU_LIST_FAILED',
    error,
  });
}

export function toggleCategoryVisibility(category) {
  AppDispatcher.dispatch({
    actionType: 'TOGGLE_CATEGORY_VISIBILITY',
    category,
  });
}
