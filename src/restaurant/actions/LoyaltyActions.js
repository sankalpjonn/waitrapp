import AppDispatcher from './../../dispatcher/AppDispatcher';

export function saveLoyaltyDetails(details) {
  AppDispatcher.dispatch({
    actionType: 'SAVE_ORDER_DETAILS',
    details,
  });
}
