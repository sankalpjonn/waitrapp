import React from 'react';
import Thanks from './../../public/images/thanks.svg';
import './ThankYouFooter.scss';

export default function ThankYouFooter() {
  return (
    <div className="thank-you-footer">
      <img src={Thanks} role="presentation" width="93" />
      <p>for trying Waitr! Do give us feedback on where we can improve.</p>
    </div>
  );
}
