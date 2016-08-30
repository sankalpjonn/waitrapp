import AppDispatcher from './../../dispatcher/AppDispatcher';
import { list, complete } from './../WebAPIUtils/orders';

export function getPendingOrders() {
  // Call method to fetch list using API
  list({ status: 'pending' });
}

export function getCompletedOrders() {
  // Call method to fetch list using API
  list({ status: 'completed' });
}

export function listSuccess(result) {
  AppDispatcher.dispatch({
    actionType: 'ORDERS_LIST_SUCCESS',
    result,
  });
}

export function listFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'ORDERS_LIST_FAILED',
    error,
  });
}

export function completeOrder(order) {
  complete(order);
}

export function completeFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'ORDER_COMPLETE_FAIL',
    error,
  });
}

export function completeSuccess(result, order) {
  AppDispatcher.dispatch({
    actionType: 'ORDER_COMPLETE_SUCCESS',
    result,
    order,
  });
}
