import request from 'superagent';
import { Config } from './../../config';
import { listSuccess, listFailed } from './../actions/ItemActions';
import LoginStore from './../stores/LoginStore';

export function list() {
  request.post(`${Config.SERVER_URL}/functions/user-businessmenu`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .set('X-Parse-Session-Token', LoginStore.getSessionToken())
    .send({ businessId: LoginStore.getUserID() })
    .end((err, res) => {
      if (err || !res.ok) {
        listFailed(err);
      } else {
        listSuccess(res.body);
      }
    });
}
