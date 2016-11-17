import React from 'react';
import classnames from 'classnames';
import ProductItem from './ProductItem';
import CartStore from './../../stores/CartStore';
import './MenuProduct.scss';

export default function MenuProduct({ visibility,
  items,
  onCustomizeClick,
  onRemoveCustomizeClick,
}) {
  return (
    <div className={classnames('menu-product', { hide: !visibility })}>
      <div className="menu-product__list">
        <div className="menu-product__list__item">
          {
            items.map((item, index) =>
              (
              <ProductItem
                key={index}
                item={item}
                quantity={CartStore.getQuantityByItemId(item.objectId)}
                onCustomizeClick={onCustomizeClick}
                onRemoveCustomizeClick={onRemoveCustomizeClick}
              />
              )
            )
          }
        </div>
      </div>
    </div>
  );
}

MenuProduct.defaultProps = {
  visibility: false,
  items: [],
  onCustomizeClick: () => {},
  onRemoveCustomizeClick: () => {},
};

MenuProduct.propTypes = {
  visibility: React.PropTypes.bool,
  items: React.PropTypes.array,
  onCustomizeClick: React.PropTypes.func,
  onRemoveCustomizeClick: React.PropTypes.func,
};
