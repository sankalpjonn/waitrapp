import React from 'react';
import Ordercard from './Ordercard.js';
import Header from './../Header/';
import ThankYouFooter from './../ThankYouFooter/';
import './OrderDetails.scss';

export default function OrderDetails() {
  return (
    <div className="order-details">
      <Header />
      <Ordercard />
      <ThankYouFooter />
    </div>
  );
}
