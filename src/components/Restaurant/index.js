import React, {Component, PropTypes} from 'react';
import StarRating from '../StarRating';

//component styles
import './style.scss';

class Restaurant extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.setRestaurant(this.props.restaurant.place_id);
  }

  render() {
    const {restaurant} = this.props;
    let imgUrl = restaurant.photos ? restaurant.photos[0].getUrl({'maxWidth': 350}) : '';

    return (
      <div className='restaurant-preview__info preview-info thumbnail' onClick={::this.handleClick}>
        <img src={imgUrl} alt={restaurant.name}/>
        <div className='caption'>
          <h2 className='preview-info__title'>{restaurant.name}</h2>
          <p className='preview-info__text'>{restaurant.vicinity}</p>
          <StarRating rating={restaurant.rating}/>
        </div>

      </div>


    )
  }
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired
};

export default Restaurant;
