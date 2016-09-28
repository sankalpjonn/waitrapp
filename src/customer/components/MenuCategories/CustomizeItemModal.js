import React from 'react';
import update from 'react-addons-update';
import classnames from 'classnames';
import VegNonVegIndicator from './../VegNonVegIndicator/';
import { customizeItem } from './../../actions/CartActions';
import './MenuCategories.scss';

export default class CustomizeItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedCustomizations: {} };

    this.onCustomizeConfirm = this.onCustomizeConfirm.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  onCustomizeConfirm() {
    const details = {
      comments: this.comments.value,
    };
    Object.assign(details, this.state.selectedCustomizations);
    customizeItem(this.props.item, details);
    this.props.onClose();
  }

  onRadioChange(event) {
    const value = event.target.value.split('||');

    const selectedCustomizations = update(this.state.selectedCustomizations, {
      [value[0]]: { $set: value[1] },
    });

    this.setState({
      selectedCustomizations,
    });
  }

  render() {
    const categories = this.props.item.customizations.map((category) => (
      <div className="modal-card__option">
        {
          category.customization.values.map((value) =>
            (
            <label>
              <input
                type="radio"
                name={category.category}
                value={`${category.category}||${value.name}`}
                onClick={this.onRadioChange}
              />
              {value.name}
            </label>
            ))
        }
      </div>
      )
    );
    return (
      <div className={classnames('customise-item-modal', { hide: !this.props.visibility })} >
        <div className="customise-item-modal__card">
          <div className="customise-item-modal__card__header modal-header">
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
            <span className="modal-card__customize-dish">Customize your dish</span>
            {categories}
            <div className="form-group">
              <label>Comments</label>
              <textarea
                placeholder="Ex. Less Spicy, Extra Mayoneese etc."
                ref={ref => { this.comments = ref; }}
              ></textarea>
            </div>
            <div className="modal-card__button">
              <button type="button" className="close" onClick={this.props.onClose}>Close</button>
              <button type="submit" className="confirm" onClick={this.onCustomizeConfirm}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CustomizeItemModal.defaultProps = {
  visibility: false,
  item: {},
  onClose: () => {},
};

CustomizeItemModal.propTypes = {
  visibility: React.PropTypes.bool,
  item: React.PropTypes.object,
  onClose: React.PropTypes.func,
};
