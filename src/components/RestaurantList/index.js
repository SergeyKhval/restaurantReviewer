import React, {Component, PropTypes} from 'react';
import Restaurant from '../Restaurant';

import './style.scss';

class RestaurantList extends Component {
  render() {
    const {restaurants, setRestaurant} = this.props;

    let sortedRestaurants = restaurants
      .sort((a, b) => {
        return parseFloat(b.rating) - parseFloat(a.rating);
      });

    return (
      <div className='container'>
        <div className='row'>
          {sortedRestaurants.map(restaurant => {
            return (
              <div key={restaurant.id} className='col-md-4'>
                <Restaurant restaurant={restaurant} setRestaurant={setRestaurant}/>
              </div>
            )
          })}
        </div>
      </div>

    )
  }
}

RestaurantList.propTypes = {
  restaurants: PropTypes.array.isRequired,
  setRestaurant: PropTypes.func.isRequired
};

export default RestaurantList;
