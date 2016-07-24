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
    let imgUrl = restaurant.photos ? restaurant.photos[0].getUrl({'maxWidth': 128, 'maxHeight': 128}) : '';

    return (
      <div className='restaurant-preview' onClick={::this.handleClick}>
        <div className='restaurant-preview__img'>
          <img className='img-thumbnail' src={imgUrl} alt={restaurant.name}/>
        </div>
        <div className='restaurant-preview__info preview-info'>
          <h3 className='preview-info__title'>{restaurant.name}</h3>
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