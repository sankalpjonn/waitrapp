/*
Access restaurant  menu from here
 */
import request from 'superagent';
import { Config } from './../../config';
import { listSuccess, listFailed } from './../actions/MenuActions';
import RestaurantStore from './../stores/RestaurantStore';

export function list() {
  request.post(`${Config.SERVER_URL}/functions/user-businessmenu`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    // .send({ businessId: 'ja1S9UpCZo' })
    // .send({ businessId: 'djs532pxWc' })
    .send({ businessId: RestaurantStore.getRestaurantID() })
    .end((err, res) => {
      if (err || !res.ok) {
        listFailed(err);
      } else {
        listSuccess(res.body);
      }
    });
}
