import React, {Component, PropTypes} from 'react';
import StarRating from '../StarRating';

//component styles
import './style.scss';

//images
const placeholder = require('../../assets/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png');

class Restaurant extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.setRestaurant(this.props.restaurant.place_id);
  }

  render() {
    const {restaurant} = this.props;
    let imgUrl = restaurant.photos ? restaurant.photos[0].getUrl({'maxWidth': 350}) : placeholder;

    return (
      <article className='col-md-4'>
        <a href='#' className='restaurant-preview__info preview-info thumbnail' onClick={::this.handleClick}
           title={restaurant.name}>
          <img src={imgUrl} alt={restaurant.name}/>
          <div className='caption'>
            <h3 className='preview-info__title' title={restaurant.name}>{restaurant.name}</h3>
            <p className='preview-info__text'>{restaurant.vicinity}</p>
            <StarRating rating={restaurant.rating}/>
          </div>

        </a>
      </article>

    )
  }
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
  setRestaurant: PropTypes.func.isRequired
};

export default Restaurant;
