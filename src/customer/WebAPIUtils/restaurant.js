import request from 'superagent';
import { Config } from './../../config';
import { detailsSuccess, detailsFailed } from './../actions/RestaurantActions';
import RestaurantStore from './../stores/RestaurantStore';

export function details() {
  request.get(`${Config.SERVER_URL}/classes/Business/${RestaurantStore.getRestaurantID()}`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .end((err, res) => {
      if (err || !res.ok) {
        detailsFailed(err);
      } else {
        detailsSuccess(res.body);
      }
    });
}
