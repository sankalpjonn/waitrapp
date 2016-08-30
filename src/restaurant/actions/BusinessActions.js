import AppDispatcher from './../../dispatcher/AppDispatcher';
import { details } from './../WebAPIUtils/business';

export function getDetails() {
  // Call method to fetch business details using API
  details();
}

export function detailsSuccess(result) {
  AppDispatcher.dispatch({
    actionType: 'BUSINESS_DETAILS_SUCCESS',
    result,
  });
}

export function detailsFailed(error) {
  AppDispatcher.dispatch({
    actionType: 'BUSINESS_DETAILS_FAILED',
    error,
  });
}
