import React from 'react';
import classnames from 'classnames';
import welcome from './../../public/images/welcome-waitr.svg';
import './WelcomeMessage.scss';

export default class WelcomeMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      welcomePageVisibility: true,
    };

    this.onLetsOrderClick = this.onLetsOrderClick.bind(this);
  }

  onLetsOrderClick() {
    this.setState({
      welcomePageVisibility: false,
    });
  }
  render() {
    return (
      <div className={classnames('welcome-page', { hide: !this.state.welcomePageVisibility })}>
        <div className="welcome-page__message">
          <div className="welcome-page__message__content">
            <div className="welcome-image">
              <img src={welcome} role="presentation" width="85px" />
            </div>
            <h5>Hi there!</h5>
            <p>
              We are a small startup with a big vision to disrupt the
              dine-in experience, make it atleast 10x better.
            </p>
            <p>
              Hope you have a good experience! Do give us your feedback :)
            </p>
          </div>
          <div
            className="welcome-page__message__button"
            onClick={this.onLetsOrderClick}
          >
            Lets Order!
          </div>
        </div>
      </div>
    );
  }
}

WelcomeMessage.defaultProps = {
};

WelcomeMessage.propTypes = {
};
