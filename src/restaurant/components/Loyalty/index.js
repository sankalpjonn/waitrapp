import React from 'react';
import Header from './../Header/';
import {
  getStatement,
  savePhoneNumber,
  postCredit,
  postDebit,
 } from './../../actions/LoyaltyActions';
import './Loyalty.scss';

export default class Loyalty extends React.Component {
  constructor(props) {
    super(props);

    this.state = { statementModal: false };

    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onAddPointsClick = this.onAddPointsClick.bind(this);
    this.onRedeemPoints = this.onRedeemPointsClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onSubmitClick() {
    if (!this.phoneNumber.value || this.phoneNumber.value.length !== 10) {
      alert('enter a valid Mobile Number');
      return;
    }

    getStatement(this.phoneNumber.value);
    savePhoneNumber(this.phoneNumber.value);
    this.setState({
      statementModal: true,
    });
  }

  onAddPointsClick() {
    if (!this.billAmount.value) {
      alert('enter bill amount');
      return;
    }
    const debitPoints = (this.billAmount.value) / 10;
    postDebit(this.phoneNumber.value, debitPoints);
  }

  onRedeemPointsClick() {
    if (!this.billAmount.value) {
      alert('enter bill amount');
      return;
    }
    const creditPoints = (this.billAmount.value) / 10;
    postCredit(this.phoneNumber.value, creditPoints);
  }

  render() {
    return (
      <div>
        <div>
          <Header />
          <label>Phone No.:</label>
          <input
            type="text"
            placeHolder="0"
            ref={ref => { this.phoneNumber = ref; }}
          />
          <button
            type="button"
            className="submit"
            onClick={this.onSubmitClick}
          >
            submit
          </button>
        </div>
        <div>
          <div>
            <h4>{this.phoneNumber.value}</h4>
          </div>
          <div>
            <div>
              <table>
                <tr>
                  <td>Credit</td>
                  <td>Credit value</td>
                </tr>
                <tr>
                  <td>Debit</td>
                  <td>Debit value</td>
                </tr>
              </table>
            </div>
            <div>
              <input
                type="text"
                placeHolder="0"
                ref={ref => { this.billAmount = ref; }}
              />
              <button
                type="button"
                className="addPoints"
                onClick={this.onAddPointsClick}
              >
                add points
              </button>
              <button
                type="button"
                className="redeemPoints"
                onClick={this.onRedeemPointsClick}
              >
                redeem points
              </button>
              <button
                type="button"
                className="close"
                onClick={this.onCloseClick}
              >
                close
              </button>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}
