import React, {Component, PropTypes} from 'react';

class RestaurantList extends Component {
  render() {
    const {restaurants} = this.props;

    return (
      <div>
        <h3>Restaurants list</h3>
        <p>Всего: {restaurants.length}</p>

        {restaurants.map(restaurant => {
          return (
            <div key={restaurant.id}>
              <h3>{restaurant.name}</h3>
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
