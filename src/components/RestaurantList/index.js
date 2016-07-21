import React, {Component, PropTypes} from 'react';
import Restaurant from '../Restaurant';

class RestaurantList extends Component {
  render() {
    const {restaurants} = this.props;

    let restaurantswithRating = restaurants.filter(r => !!r.rating);

    return (
      <div>
        <h3>Restaurants list</h3>
        <p>Всего: {restaurantswithRating.length}</p>

        {restaurantswithRating
          .sort((a, b) => {
            return parseFloat(b.rating) - parseFloat(a.rating);
          }).map(restaurant => {
            return (
              <div key={restaurant.id}>
                <Restaurant restaurant={restaurant}/>
              </div>
            )
          })}
      </div>
    )
  }
}

RestaurantList.propTypes = {
  restaurants: PropTypes.array.isRequired
};

export default RestaurantList;
