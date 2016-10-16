import React from 'react';
import classnames from 'classnames';
import QrReader from 'react-qr-reader';
// import Loader from './../Loader';
import { saveOrderDetails } from './../../actions/OrderActions';
import RestaurantStore from './../../stores/RestaurantStore';
import OrderStore from './../../stores/OrderStore';
import './MenuProduct.scss';

export default class TableNoPopUp extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { isOrderInProgress: false };

    // this.onConfirmClick = this.onConfirmClick.bind(this);
    this.onHandleScan = this.onHandleScan.bind(this);
    this.onHandleError = this.onHandleError.bind(this);
  }

  onHandleScan(data) {
    saveOrderDetails({
      tableNumber: data,
    });
    window.setTimeout(() => {
      this.context.router.push(`/restaurant/${RestaurantStore.getRestaurantID()}/orders`);
    }, 3);
  }

  onHandleError(err) {
    this.error = err;
  }
  /*
  onConfirmClick() {
    if (!this.tableNumber.value) {
      alert('Please enter a table number');
      return;
    }

    saveOrderDetails({
      tableNumber: this.tableNumber.value,
      comments: this.comments.value,
    });
    window.setTimeout(() => {
      this.context.router.push(`/restaurant/${RestaurantStore.getRestaurantID()}/orders`);
    }, 3);
  }
  */
  getDefaultTableNumber() {
    return OrderStore.getOrderDetails().tableNumber;
  }

  render() {
    const previewStyle = {
      height: '100%',
      width: '100%',
    };

    return (
      <div className={classnames('table-no-pop-up', { hide: !this.props.visibility })}>
        <div className="table-no-pop-up__form">
          <div className="form-group">
            <label>Table No</label>
            <QrReader
              previewStyle={previewStyle}
              handleError={this.onHandleError}
              handleScan={this.onHandleScan}
              interval={100}
              facingMode={'rear'}
            />
            <p>{this.error}</p>
            {/*
            <input
              defaultValue={this.getDefaultTableNumber()}
              type="text"
              className="table-no-pop-up__form__table-no"
              ref={ref => { this.tableNumber = ref; }}
            />
            */}
          </div>
          {/*
            <div className="form-group">
              <label>Comments</label>
              <textarea
                placeholder="Ex. Less Spicy, Extra Mayoneese etc."
                ref={ref => { this.comments = ref; }}
              ></textarea>
            </div>
          */}
          {/*
          <div className="table-no-pop-up__form__button">
            <button type="button" className="close" onClick={this.props.onClose}>Close</button>
            <button type="submit" className="confirm" onClick={this.onConfirmClick}>
              {
                this.state.isOrderInProgress ?
                  <Loader /> :
                  <span>Confirm</span>
              }
            </button>
          </div>
          */}
        </div>
      </div>
    );
  }
}

TableNoPopUp.defaultProps = {
  visibility: false,
  onClose: () => {},
};

TableNoPopUp.propTypes = {
  visibility: React.PropTypes.bool,
  onClose: React.PropTypes.func,
};

TableNoPopUp.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
