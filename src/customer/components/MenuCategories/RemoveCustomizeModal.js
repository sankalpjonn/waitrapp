import React from 'react';
// import CartStore from './../../stores/CartStore';
import { removeCustomization } from './../../actions/CartActions';
import './MenuCategories.scss';

export default class RemoveCustomizeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  onRemoveClick() {
    const details = {};
    removeCustomization(this.props, details);
  }

  render() {
    return (
      <div>
        <div className="item-name">
          <h5>Rajma Chawal</h5>
        </div>
        <div className="item-customizations-list">
          <div className="item-customization-list-item">
            <h6>Veg Sheek Kebab</h6>
            <button type="button" className="remove" onClick={this.onRemoveClick}>
              Remove
            </button>
          </div>
          <div className="item-customization-list-item">
            <h6>2 Fried Eggs</h6>
            <button type="button" className="remove" onClick={this.onRemoveclick}>
              Remove
            </button>
          </div>
          <div className="item-customization-list-item">
            <h6>Lamb Skewer</h6>
            <button type="button" className="remove" onClick={this.onRemoveclick}>
              Remove
            </button>
          </div>
        </div>
        <div className="item-customization-footer">
          <button type="button" className="close" onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }
}

RemoveCustomizeModal.defaultProps = {
  visibility: false,
  onClose: () => {},
};

RemoveCustomizeModal.propTypes = {
  visibility: React.PropTypes.bool,
  onClose: React.PropTypes.func,
};
