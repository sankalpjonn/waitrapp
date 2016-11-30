import React from 'react';
import classnames from 'classnames';
import VegNonVegIndicator from './../VegNonVegIndicator/';
import CartStore from './../../stores/CartStore';
import { removeCustomization } from './../../actions/CartActions';
import './MenuCategories.scss';

export default class RemoveCustomizeModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customizations: CartStore.getItemCustomizationsByItemId(this.props.item.objectId),
    };

    this.onCartChange = this.onCartChange.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  componentDidMount() {
    CartStore.addChangeListener(this.onCartChange);
  }

  componentWillUnmount() {
    CartStore.removeChangeListener(this.onCartChange);
  }

  onCartChange() {
    const customizations = CartStore.getItemCustomizationsByItemId(this.props.item.objectId);
    this.setState({
      customizations,
    });
  }

  onRemoveClick() {
    const details = {};
    removeCustomization(this.props, details);
  }

  render() {
    const selectedCustomizations = this.state.customizations ?
    this.state.customizations.map((customization) => (
      <div className="modal_card__option">
        {customization['Stick Addon']}
        {customization.comments}
      </div>
    )) : undefined;
    return (
      <div className={classnames('remove-customise-modal', { hide: !this.props.visibility })}>
        <div className="remove-customise-modal__card">
          <div className="remove-customise-modal__card__header modal-header">
            <VegNonVegIndicator item={this.props.item} />
            <div className="modal-header__name">
              <span className="modal-header__name__product">{this.props.item.name}</span>
              <span className="modal-header__name__category">{this.props.item.category}</span>
              <span className="modal-header__name__serves">
                Serves {this.props.item.servingSize}
              </span>
            </div>
          </div>
          <div className="modal-card">
            <span className="modal-card__customize-dish">Remove Customizations</span>
              {selectedCustomizations}
            <div className="modal-card__button">
              <button type="button" className="close" onClick={this.props.onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RemoveCustomizeModal.defaultProps = {
  visibility: false,
  item: {},
  onClose: () => {},
};

RemoveCustomizeModal.propTypes = {
  visibility: React.PropTypes.bool,
  item: React.PropTypes.object,
  onClose: React.PropTypes.func,
};
