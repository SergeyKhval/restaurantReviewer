import React, {Component, PropTypes} from 'react';
import './style.scss';

class StarRating extends Component {
  render() {
    let rating = Math.round(this.props.rating);

    let template = [1, 2, 3, 4, 5].map((el, index) => {
      let starClass = el <= rating ? 'glyphicon-star' : 'glyphicon-star-empty';
      return (<span key={index} className={`star-rating__item glyphicon ${starClass} text-warning`}></span>)
    });


    return (
      <div className='star-rating'>
        {template}
      </div>
    )
  }
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired
};

export default StarRating;
