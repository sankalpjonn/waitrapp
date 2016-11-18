import React from 'react';
import { addItem } from './../../actions/CartActions';
import './MenuProduct.scss';

export default function QuantitySelector({ item,
  onQuantityIncrease,
  onQuantityDecrease,
  quantity }) {
  const onAddItemClick = () => {
    addItem(item);
    onQuantityIncrease();
  };

  const onRemoveItemClick = () => {
    onQuantityDecrease();
  };

  return (
    <div className="quantity-selector">
      {
        quantity ?
        (
          <div className="quantity-selector__sub" onClick={onRemoveItemClick}><span>-</span></div>
        ) :
        undefined
      }
      {
        quantity ?
        (
          <div className="quantity-selector__number">{quantity}</div>
        ) :
        undefined
      }
      <div className="quantity-selector__add" onClick={onAddItemClick}><span>+</span></div>
    </div>
  );
}

QuantitySelector.defaultProps = {
  onQuantityIncrease: () => {},
  onQuantityDecrease: () => {},
};

QuantitySelector.propTypes = {
  item: React.PropTypes.object.isRequired,
  quantity: React.PropTypes.number.isRequired,
  onQuantityIncrease: React.PropTypes.func,
  onQuantityDecrease: React.PropTypes.func,
};
