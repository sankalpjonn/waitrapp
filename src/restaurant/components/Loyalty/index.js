import React from 'react';
import { saveLoyaltyDetails } from './../../actions/LoyaltyActions';
import LoyaltyStore from './../../stores/LoyaltyStore';
import './Loyalty.scss';

export default class Loyalty extends React.Component {
  consructor(props) {
    super(props);
    this.state = {};

    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onSubmitClick() {
    if (!this.phoneNumber.value || this.billAmount.value ||
     (!this.phoneNumber.value && !this.billAmount.value)) {
      alert('Please Enter Details!');
      return;
    }

    saveLoyaltyDetails({
      phoneNumber: this.phoneNumber.value,
      billAmount: this.billAmount.value,
    });
  }

  getDefaultDetails() {
    return { phoneNumber: '', billAmount: '' };
  }

  render() {
    return (
      <div>
        <div className="detailsForm">
          <label>Phone Number:</label>
          <input
            defaultValue={this.getDefaultDetails().phoneNumber}
            type="text"
            ref={ref => { this.phoneNumber = ref; }}
          />
          <input
            defaultValue={this.getDefaultDetails().billAmount}
            type="text"
            ref={ref => { this.billAmount = ref; }}
          />
          <button type="submit" className="submit" onClick={this.onSubmitClick}>Submit</button>
        </div>
      </div>
    );
  }
}
