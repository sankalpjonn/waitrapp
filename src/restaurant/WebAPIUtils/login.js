import request from 'superagent';
import { Config } from './../../config';
import { loginSuccess, loginFailed } from './../actions/LoginActions';

export function doLogin(credentials) {
  request.get(`${Config.SERVER_URL}/login`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .query(credentials)
    .end((err, res) => {
      if (err || !res.ok) {
        loginFailed(err);
      } else {
        loginSuccess(res.body);
      }
    });
}
