import React from 'react';
import classnames from 'classnames';
import MenuProduct from './../MenuProduct/';
import { toggleCategoryVisibility } from './../../actions/MenuActions';
import './MenuCategories.scss';

export default class MenuCategoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.onToggleClick = this.onToggleClick.bind(this);
  }

  onToggleClick() {
    toggleCategoryVisibility(this.props.category);
  }

  render() {
    return (
      <div
        className={classnames(
          'category-item',
          { 'category-item--expanded': this.props.category.expanded }
        )}
      >
        <div className="category-item__wrapper" onClick={this.onToggleClick}>
          <span
            className="category-item__name"
          >
            <i
              className="fa fa-circle fa-1x"
              aria-hidden="true"
            >
            </i>
            &nbsp; {this.props.category.name}
          </span>
          <span
            className={classnames('chevron', { bottom: !this.props.category.expanded })}
          ></span>
        </div>
        <MenuProduct
          visibility={this.props.category.expanded}
          items={this.props.category.items}
          onCustomizeClick={this.props.onCustomizeClick}
          onRemoveCustomizeClick={this.props.onRemoveCustomizeClick}
        />
      </div>
    );
  }
}

MenuCategoryItem.defaultProps = {
  onCustomizeClick: () => {},
  onRemoveCustomizeClick: () => {},
};

MenuCategoryItem.propTypes = {
  category: React.PropTypes.object.isRequired,
  onCustomizeClick: React.PropTypes.func,
  onRemoveCustomizeClick: React.PropTypes.func,
};
