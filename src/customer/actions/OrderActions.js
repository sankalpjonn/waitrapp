import AppDispatcher from './../../dispatcher/AppDispatcher';
import { place, bill, rate } from './../WebAPIUtils/order';

export function saveOrderDetails(details) {
  AppDispatcher.dispatch({
    actionType: 'SAVE_ORDER_DETAILS',
    details,
  });
}

export function placeOrder(details) {
  place(details);
}

export function placeOrderSuccess(response, statusCode) {
  AppDispatcher.dispatch({
    actionType: 'ORDER_PLACE_SUCCESS',
    response,
    statusCode,
  });
}

export function placeOrderFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'ORDER_PLACE_FAIL',
    error,
  });
}

export function requestBill(order, paymentMode) {
  bill(order.objectId, paymentMode);
}

export function billRequestSuccess(response, statusCode) {
  AppDispatcher.dispatch({
    actionType: 'BILL_REQUEST_SUCCESS',
    response,
    statusCode,
  });
}

export function billRequestFail(error) {
  AppDispatcher.dispatch({
    actionType: 'BILL_REQUEST_FAIL',
    error,
  });
}

export function rateItem(details) {
  rate(details);
}

export function rateItemSuccess(response, statusCode) {
  AppDispatcher.dispatch({
    actionType: 'RATE_ITEM_SUCCESS',
    response,
    statusCode,
  });
}

export function rateItemFail(error) {
  AppDispatcher.dispatch({
    actionType: 'RATE_ITEM_FAIL',
    error,
  });
}
