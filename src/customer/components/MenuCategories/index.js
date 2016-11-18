import React from 'react';
import ReactDOM from 'react-dom';
import MenuCategoryItem from './MenuCategoryItem';
import PlaceOrderFooter from './PlaceOrderFooter';
import Header from './../Header/';
import { getItems } from './../../actions/MenuActions';
import MenuStore from './../../stores/MenuStore';
import RestaurantStore from './../../stores/RestaurantStore';
import CustomizeItemModal from './CustomizeItemModal';
import RemoveCustomizeModal from './RemoveCustomizeModal';
import './MenuCategories.scss';

export default class MenuCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: MenuStore.getCategoriesList(),
      restaurant: RestaurantStore.getDetails(),
      expandedItem: -1,
      customizeModalVisibility: false,
      removeCustomizeModalVisibility: false,
    };

    this.onMenuChange = this.onMenuChange.bind(this);
    this.onRestaurantChange = this.onRestaurantChange.bind(this);
    this.onCustomizeClick = this.onCustomizeClick.bind(this);
    this.onCustomizeItemModalClose = this.onCustomizeItemModalClose.bind(this);
    this.onRemoveCustomizeClick = this.onRemoveCustomizeClick.bind(this);
    this.onRemoveCustomizeModalClose = this.onRemoveCustomizeModalClose.bind(this);
  }

  componentDidMount() {
    MenuStore.addChangeListener(this.onMenuChange);
    RestaurantStore.addChangeListener(this.onRestaurantChange);

    if (!MenuStore.getCategoriesList().length) getItems();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expandedItem === this.state.expandedItem) return false;

    const domNode = ReactDOM.findDOMNode(this.refs.expandedItem);

    if (domNode) {
      domNode.scrollIntoView({ behavior: 'smooth' });
    }

    return true;
  }

  componentWillUnmount() {
    MenuStore.removeChangeListener(this.onMenuChange);
    RestaurantStore.removeChangeListener(this.onRestaurantChange);
  }

  onMenuChange() {
    const categories = MenuStore.getCategoriesList();
    let expandedItem = -1;
    for (let i = 0, l = categories.length; i < l; i++) {
      if (categories[i].expanded) {
        expandedItem = i;
        break;
      }
    }
    this.setState({
      categories,
      expandedItem,
    });
  }

  onRestaurantChange() {
    this.setState({
      restaurant: RestaurantStore.getDetails(),
    });
  }

  onCustomizeClick(item) {
    this.setState({
      customizeModalVisibility: true,
      selectedItem: item,
    });
  }

  onCustomizeItemModalClose() {
    this.setState({
      customizeModalVisibility: false,
    });
  }

  onRemoveCustomizeClick(item) {
    this.setState({
      removeCustomizeModalVisibility: true,
      selectedItem: item,
    });
  }

  onRemoveCustomizeModalClose() {
    this.setState({
      removeCustomizeModalVisibility: false,
    });
  }

  render() {
    return (
      <div className="categories">
        <Header />
        <div className="categories__menu">
          {
            this.state.categories.map((item, index) => (
              <MenuCategoryItem
                key={index}
                category={item}
                onCustomizeClick={this.onCustomizeClick}
                onRemoveCustomizeClick={this.onRemoveCustomizeClick}
                ref={item.expanded ? 'expandedItem' : ''}
              />
              )
            )
          }
        </div>
          {
            this.state.selectedItem && this.state.selectedItem.customizations ?
            (
              <CustomizeItemModal
                visibility={this.state.customizeModalVisibility}
                item={this.state.selectedItem}
                onClose={this.onCustomizeItemModalClose}
              />
            ) :
            undefined
          }
          {
            this.state.selectedItem && this.state.selectedItem.customizations ?
            (
              <RemoveCustomizeModal
                visibility={this.state.removeCustomizeModalVisibility}
                onClose={this.onRemoveCustomizeModalClose}
              />
            ) :
            undefined
          }
        <PlaceOrderFooter />
      </div>
    );
  }
}
