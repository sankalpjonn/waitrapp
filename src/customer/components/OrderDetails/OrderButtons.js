import React from 'react';
import classnames from 'classnames';
import Tick from './../../public/images/tick.svg';

export default function OrderButtons({ paymentMode, onModeChange, onRequestBillClick }) {
  const onCashModeClick = () => onModeChange('cash');
  const onCardModeClick = () => onModeChange('card');

  return (
    <div className="order-card__body__actions action">
      <div className="action__payment">
        <div className="action__payment__mode" onClick={onCashModeClick} >
          <span
            className={classnames('checkbox',
              { check: paymentMode === 'cash' })}
          >
            {
              paymentMode === 'cash' ?
                <img src={Tick} role="presentation" width="6" /> :
                undefined
            }
          </span>
          <label>Cash</label>
        </div>
        <div
          className="action__payment__mode"
          onClick={onCardModeClick}
        >
          <span
            className={classnames('checkbox',
            { check: paymentMode === 'card' })}
          >
            {
              paymentMode === 'card' ?
                <img src={Tick} role="presentation" width="6" /> :
                undefined
            }
          </span>
          <label>Card</label>
        </div>
      </div>
      <div className="action__request" onClick={onRequestBillClick}>Request for Bill</div>
    </div>
  );
}

OrderButtons.defaultProps = {
  onModeChange: () => {},
  onRequestBillClick: () => {},
};

OrderButtons.propTypes = {
  paymentMode: React.PropTypes.string.isRequired,
  onModeChange: React.PropTypes.func,
  onRequestBillClick: React.PropTypes.func,
};
