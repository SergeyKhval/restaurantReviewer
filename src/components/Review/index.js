import React, {Component, PropTypes} from 'react';
import StarRating from '../StarRating';

class Review extends Component {
  render() {
    const {author, text, rating, date} = this.props;

    let d = new Date(date * 1000);

    return (
      <div>
        <blockquote>
          <p>{text}</p>
          <StarRating rating={rating}/>
          <footer>{`${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`}<cite> {author}</cite></footer>
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
