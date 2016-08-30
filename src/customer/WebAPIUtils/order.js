import request from 'superagent';
import { Config } from './../../config';
import {
  placeOrderSuccess,
  placeOrderFailed,
  billRequestFail,
  billRequestSuccess,
  rateItemSuccess,
  rateItemFail,
} from './../actions/OrderActions';
import RestaurantStore from './../stores/RestaurantStore';

export function place(details) {
  const data = {
    businessId: {
      __type: 'Pointer',
      className: 'Business',
      objectId: RestaurantStore.getRestaurantID(),
    },
    tableNumber: +details.tableNumber,
    status: 0,
    comments: details.comments,
    orderData: details.items,
  };
  request.post(`${Config.SERVER_URL}/classes/Order`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .send(data)
    .end((err, res) => {
      if (err || !res.ok) {
        placeOrderFailed(err);
      } else {
        placeOrderSuccess(res.body, res.statusCode);
      }
    });
}

export function bill(orderid, paymentMode) {
  request.put(`${Config.SERVER_URL}/classes/Order/${orderid}`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .send({ status: 2, paymentMode })
    .end((err, res) => {
      if (err || !res.ok) {
        billRequestFail(err);
      } else {
        billRequestSuccess(res.body, res.statusCode);
      }
    });
}

export function rate(details) {
  const data = {
    businessId: {
      __type: 'Pointer',
      className: 'Business',
      objectId: RestaurantStore.getRestaurantID(),
    },
    item: {
      __type: 'Pointer',
      className: 'Menu',
      objectId: details.item.objectId,
    },
    tableNumber: +details.tableNumber,
    rating: details.rating,
  };
  request.post(`${Config.SERVER_URL}/classes/ItemRating`)
    .set('Accept', 'application/json')
    .set('X-Parse-Application-Id', Config.PARSE_APP_ID)
    .send(data)
    .end((err, res) => {
      if (err || !res.ok) {
        rateItemFail(err);
      } else {
        rateItemSuccess(res.body, res.statusCode);
      }
    });
}
