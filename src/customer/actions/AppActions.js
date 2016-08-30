import AppDispatcher from './../../dispatcher/AppDispatcher';

export function setRestaurant(restaurantid) {
  AppDispatcher.dispatch({
    actionType: 'SET_RESTAURANT',
    restaurantid,
  });
}
