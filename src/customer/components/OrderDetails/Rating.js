import React from 'react';
import StarActive from './../../public/images/active-star@2x.png';
import Star from './../../public/images/star@2x.png';
import './OrderDetails.scss';

export default class Rating extends React.Component {
  constructor(props) {
    super(props);

    this.state = { rating: this.props.value };

    this.onStarClick = this.onStarClick.bind(this);
  }

  onStarClick(index) {
    if (this.props.value !== -1) return false;

    return () => {
      this.setState({
        rating: index + 1,
      }, () => {
        this.props.onRatingChange(this.state.rating);
      });
    };
  }

  render() {
    const totalRating = [1, 2, 3, 4, 5];
    return (
      <div className="rating">
        {
          totalRating.map((a, index) =>
            <img
              key={index}
              src={index < this.state.rating ? StarActive : Star}
              role="presentation"
              width="25"
              onClick={this.onStarClick(index)}
            />
          )
        }
      </div>
    );
  }
}

Rating.defaultProps = {
  value: -1,
  onRatingChange: () => {},
};

Rating.propTypes = {
  value: React.PropTypes.number,
  onRatingChange: React.PropTypes.func,
};
