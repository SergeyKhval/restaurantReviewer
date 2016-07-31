import React, {Component, PropTypes} from 'react';
import StarRating from '../StarRating';

class Review extends Component {
  render() {
    const {author, text, rating, date} = this.props;

    let d = new Date(date);

    return (
      <div className='well well-sm'>
        <blockquote>
          <p>{text}</p>
          <StarRating rating={rating}/>
          <footer>
            <cite><span className='glyphicon glyphicon-user'/> {author}          </cite>
            {`${d.getMonth()}-${d.getDate()}-${d.getFullYear()}`}
          </footer>
        </blockquote>

      </div>
    )
  }
}

Review.propTypes = {
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired
};

export default Review;
