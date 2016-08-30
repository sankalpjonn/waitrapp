import request from 'superagent';
import { Config } from './../../config';
import {
  listSuccess,
  listFailed,
  completeFailed,
  completeSuccess,
} from './../actions/OrdersActions';
import LoginStore from './../stores/LoginStore';

export function list(params) {
  request.post(`${Config.SERVER_URL}/functions/business-orders`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .set('X-Parse-Session-Token', LoginStore.getSessionToken())
    .send(params)
    .end((err, res) => {
      if (err || !res.ok) {
        listFailed(err);
      } else {
        listSuccess(res.body);
      }
    });
}

export function complete(order) {
  request.put(`${Config.SERVER_URL}/classes/Order/${order.objectId}`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .set('X-Parse-Session-Token', LoginStore.getSessionToken())
    .send({ status: 3 })
    .end((err, res) => {
      if (err || !res.ok) {
        completeFailed(err);
      } else {
        completeSuccess(res.body, order);
      }
    });
}
