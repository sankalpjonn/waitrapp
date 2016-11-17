import React from 'react';
import QuantitySelector from './QuantitySelector';
import TopRated from './../../public/images/top-rated.svg';
import Recommended from './../../public/images/recommended.svg';
import TodaySpecial from './../../public/images/today-special.svg';
import VegNonVegIndicator from './../VegNonVegIndicator/';
import Spicy from './../../public/images/spicy@2x.png';

export default function ProductItem({ item, onCustomizeClick, onRemoveCustomizeClick, quantity }) {
  const onItemAdd = () => {
    if (item.customizations) onCustomizeClick(item);
  };

  const onItemRemove = () => {
    if (item.customizations) onRemoveCustomizeClick(item);
  };

  const customizable = [];

  if (item.customizations) {
    customizable.push(
      <span
        key={1}
      >Customisations available</span>
    );
  }

  if (item.servingSize) {
    customizable.push(<span key={2}>Serves {item.servingSize}</span>);
  }

  if (customizable.length > 1) {
    for (let i = 1, l = customizable.length; i < l; i += 2) {
      customizable.splice(i, 0, (<span key={3}>&bull;</span>));
    }
  }

  return (
    <div className="menu-item">
      <VegNonVegIndicator item={item} />
      <div className="menu-item__details">
        {
          item.isRecommended ?
            <img src={Recommended} role="presentation" width="110px" /> :
            undefined
        }
        {
          item.isTopRated ?
            <img src={TopRated} role="presentation" width="90px" /> :
            undefined
        }
        {
          item.isTodaySpecial ?
            <img src={TodaySpecial} role="presentation" width="115px" /> :
            undefined
        }
        <div className="menu-item__details__name">
          <div className="menu-item__details__name__detail">
            {
              item.spicy ?
                <img src={Spicy} role="presentation" width="9px" /> :
                undefined
            }
            {item.name}
          </div>
          <div className="menu-item__details__name__quantity">
            <QuantitySelector
              item={item}
              quantity={quantity}
              onQuantityIncrease={onItemAdd}
              onQuantityDecrease={onItemRemove}
            />
          </div>
        </div>
        <div className="menu-item__details__customisable">
          {customizable}
        </div>
        <div>
          <div className="menu-item__details__ingredient">
            {item.description}
          </div>
          <div className="menu-item__details__price">` {item.price}</div>
        </div>
      </div>
    </div>
  );
}

ProductItem.defaultProps = {
  item: {},
  quantity: 0,
  onCustomizeClick: () => {},
  onRemoveCustomizeClick: () => {},
};

ProductItem.propTypes = {
  item: React.PropTypes.object,
  quantity: React.PropTypes.number,
  onCustomizeClick: React.PropTypes.func,
  onRemoveCustomizeClick: React.PropTypes.func,
};
