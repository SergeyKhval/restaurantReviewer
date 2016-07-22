import React, {Component} from 'react';

class StarRating extends Component {
  render() {
    const {rating} = this.props;

    return (
      <div>
        rating: {rating}
      </div>
    )
  }
}

export default StarRating;
