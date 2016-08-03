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
      <div className='col-md-4'>
        <a href='#' className='restaurant-preview__info preview-info thumbnail' onClick={::this.handleClick}
           title={restaurant.name}>
          <img src={imgUrl} alt={restaurant.name}/>
          <div className='caption'>
            <h3 className='preview-info__title' title={restaurant.name}>{restaurant.name}</h3>
            <p className='preview-info__text'>{restaurant.vicinity}</p>
            <StarRating rating={restaurant.rating}/>
          </div>

        </a>
      </div>

    )
  }
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired
};

export default Restaurant;
