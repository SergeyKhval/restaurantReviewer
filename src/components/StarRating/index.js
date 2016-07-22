import React, {Component, PropTypes} from 'react';

class StarRating extends Component {
  render() {
    let rating = Math.round(this.props.rating);
    console.log(rating);

    let arr = new Array(5);

    let template = arr.map((el, index) => {
      return (index <= rating) ? <span key={index} className='star star_active'>star</span> :
        <span key={index} className='star'>no star</span>;
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
}

export default StarRating;
