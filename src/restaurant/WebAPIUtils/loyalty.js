import request from 'superagent';
import { Config } from './../../config';
import LoginStore from './../stores/LoginStore';
import {
  statementSuccess,
  statementFailed,
  debitSuccess,
  debitFailed,
  creditSuccess,
  creditFailed,
} from './../actions/LoyaltyActions';

export function statement(params) {
  request.get(`${Config.SERVER_URL}/functions/business-loyaltypoints`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .set('X-Parse-Session-Token', LoginStore.getSessionToken())
    .send(params)
    .end((err, res) => {
      if (err || !res.ok) {
        statementFailed(err);
      } else {
        statementSuccess(res.body);
      }
    });
}

export function debit(userPhoneNumber, value) {
  request.post(`${Config.SERVER_URL}/classes/LoyaltyPoints`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .send({
      userPhoneNo: userPhoneNumber,
      businessId: LoginStore.getUserID(),
      debit: value,
    })
    .end((err, res) => {
      if (err || !res.ok) {
        debitFailed(err);
      } else {
        debitSuccess(res.body);
      }
    });
}

export function credit(userPhoneNumber, value) {
  request.post(`${Config.SERVER_URL}/classes/LoyaltyPoints`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .send({
      userPhoneNo: userPhoneNumber,
      businessId: LoginStore.getUserID(),
      credit: value,
    })
    .end((err, res) => {
      if (err || !res.ok) {
        creditFailed(err);
      } else {
        creditSuccess(res.body);
      }
    });
}
