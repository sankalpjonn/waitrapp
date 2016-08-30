import React from 'react';
import orderblank from './../../public/images/orders-blank@2x.png';
import './Orders.scss';

export default function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <img src={orderblank} role="presentation" />
      <p className="empty-state__text">{message}</p>
    </div>
  );
}

EmptyState.defaultProps = {
  message: 'No new orders yet',
};

EmptyState.propTypes = {
  message: React.PropTypes.string,
};
