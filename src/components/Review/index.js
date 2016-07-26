import React, {Component, PropTypes} from 'react';
import StarRating from '../StarRating';

class Review extends Component {
  render() {
    const {author, text, rating} = this.props;
    return (
      <div>
        <blockquote>
          <p>{text}</p>
          <StarRating rating={rating}/>
          <footer><cite>{author}</cite></footer>
        </blockquote>

      </div>
    )
  }
}

Review.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default Review;
