import React from 'react';
import { loginSuccess } from './../../actions/LoginActions';
import { getItems } from './../../actions/ItemActions';
import LoginStore from './../../stores/LoginStore';
import './app.scss';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onLoginChange = this.onLoginChange.bind(this);
  }

  componentWillMount() {
    const savedUser = localStorage.getItem('BUSINESS');
    if (savedUser) {
      // Register change handler on store
      LoginStore.addChangeListener(this.onLoginChange);

      loginSuccess(JSON.parse(savedUser));
    }
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

  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}

App.defaultProps = {
  children: [],
};

App.propTypes = {
  children: React.PropTypes.node,
};

App.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
