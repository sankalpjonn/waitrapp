import AppDispatcher from './../../dispatcher/AppDispatcher';
import { details } from './../WebAPIUtils/restaurant';

export function getDetails() {
  // Call method to fetch restaurant details using API
  details();
}

export function detailsSuccess(result) {
  AppDispatcher.dispatch({
    actionType: 'RESTAURANT_DETAILS_SUCCESS',
    result,
  });
}

export function detailsFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'RESTAURANT_DETAILS_FAILED',
    error,
  });
}
