import React from 'react';
import Cash from './../../public/images/cash.svg';
import Card from './../../public/images/bank-terminal.svg';

import './Orders.scss';

export default function BillRequested({ mode }) {
  if (mode === 'cash') {
    return (
      <div className="bill-requested">
        <img src={Cash} role="presentation" width={15} />
        Bill Requested (Cash)
      </div>
    );
  } else if (mode === 'card') {
    return (
      <div className="bill-requested">
        <img src={Card} role="presentation" width={15} />
        Bill Requested (Card)
      </div>
    );
  }
}

BillRequested.defaultProps = {
  mode: 'cash',
};

BillRequested.propTypes = {
  mode: React.PropTypes.string,
};
