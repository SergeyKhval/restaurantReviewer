import React, {Component, PropTypes} from 'react';
import Restaurant from '../Restaurant';

import './style.scss';

class RestaurantList extends Component {
  render() {
    const {restaurants, setRestaurant} = this.props;

    let restaurantswithRating = restaurants.filter(r => !!r.rating);

    return (
      <ul className='restaurant-list list-unstyled'>
        {restaurantswithRating
          .sort((a, b) => {
            return parseFloat(b.rating) - parseFloat(a.rating);
          }).map(restaurant => {
            return (
              <li key={restaurant.id} className='restaurant-list__item'>
                <Restaurant restaurant={restaurant} setRestaurant={setRestaurant}/>
              </li>
            )
          })}
      </ul>
    )
  }
}

RestaurantList.propTypes = {
  restaurants: PropTypes.array.isRequired
};

export default RestaurantList;
