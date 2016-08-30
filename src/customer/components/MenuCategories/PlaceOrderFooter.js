import React from 'react';
import classnames from 'classnames';
import TableNoPopUp from './../MenuProduct/TableNoPopUp';
import CartStore from './../../stores/CartStore';
import MenuStore from './../../stores/MenuStore';
import IconPlaceorder from './../../public/images/placeorder.svg';
import IconDish from './../../public/images/dish.svg';
import './MenuCategories.scss';

export default class PlaceOrderFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableNoPopupVisibility: false,
      itemsCount: CartStore.getItemsCount(),
    };

    this.onMenuChange = this.onMenuChange.bind(this);
    this.onPlaceOrderClick = this.onPlaceOrderClick.bind(this);
    this.onTableNoPopupClose = this.onTableNoPopupClose.bind(this);
  }

  componentDidMount() {
    MenuStore.addChangeListener(this.onMenuChange);
  }

  componentWillUnmount() {
    MenuStore.removeChangeListener(this.onMenuChange);
  }

  onMenuChange() {
    this.setState({
      itemsCount: CartStore.getItemsCount(),
    });
  }

  onPlaceOrderClick() {
    this.setState({
      tableNoPopupVisibility: true,
    });
  }

  onTableNoPopupClose() {
    this.setState({
      tableNoPopupVisibility: false,
    });
  }

  render() {
    return (
      <div className={classnames({ hide: !this.state.itemsCount })}>
        <div className="placeorder">
          <div className="total-items">
            <img src={IconDish} role="presentation" width="17" />
            {this.state.itemsCount} items
          </div>
          <div className="place-order" onClick={this.onPlaceOrderClick}>
            REVIEW ORDER
            <img src={IconPlaceorder} role="presentation" width="9" />
          </div>
        </div>
        <TableNoPopUp
          visibility={this.state.tableNoPopupVisibility}
          onClose={this.onTableNoPopupClose}
        />
      </div>
    );
  }
}
