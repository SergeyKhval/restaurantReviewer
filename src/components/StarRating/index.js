import React, {Component, PropTypes} from 'react';

class StarRating extends Component {
  render() {
    let rating = Math.round(this.props.rating);

    let template = [1, 2, 3, 4, 5].map((el, index) => {
      let starClass = el <= rating ? 'glyphicon glyphicon-star text-warning' : 'glyphicon glyphicon-star-empty text-warning';
      return (<span key={index} className={starClass}></span>)
    });


    return (
      <div>
        {template}
      </div>
    )
  }
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired
};

export default StarRating;
