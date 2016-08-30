import React from 'react';
import { login } from './../../actions/LoginActions';
import { getItems } from './../../actions/ItemActions';
import LoginStore from './../../stores/LoginStore';
import mascot from './../../public/images/mascot@2x.png';
import './Login.scss';

export default class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { username: 'hole', password: 'holeinthewall' };

    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginChange = this.onLoginChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    // Register change handler on store
    LoginStore.addChangeListener(this.onLoginChange);

    // Send Username and Password to API
    login(this.state);
  }

  onLoginChange() {
    // Unregister change handler on store
    LoginStore.removeChangeListener(this.onLoginChange);

    const userid = LoginStore.getUserID();

    if (userid) {
      // Fetch list of items
      getItems();

      // Login successful; Redirect to orders page
      this.context.router.push('/business/orders');
    } else {
      const error = LoginStore.getError();
      alert(error.message);
    }
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-page__wrapper">
          <div className="login-page__form">
            <h4 className="login-page__form__head">Waitr</h4>
            <form id="loginForm" noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.onUsernameChange}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
          <div className="login-page__circle">
            <img src={mascot} role="presentation" />
          </div>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
