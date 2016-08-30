import React from 'react';
import classnames from 'classnames';
import './VegNonVegIndicator.scss';

export default function VegNonVegIndicator({ item }) {
  return (
    <div className="veg-nonveg">
      <span
        className={classnames(
          'veg-nonveg__icon',
          { 'veg-nonveg__icon--veg': !item.nonVeg }
        )}
      ></span>
    </div>
  );
}

VegNonVegIndicator.propTypes = {
  item: React.PropTypes.object.isRequired,
};
