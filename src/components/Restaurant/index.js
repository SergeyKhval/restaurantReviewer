import React, {Component, PropTypes} from 'react';

class Restaurant extends Component {
  render() {
    const {restaurant} = this.props;

    return (
      <div>
        <h3><a href={`/restaurants/${restaurant.place_id}`}>{restaurant.name}</a></h3>
        <p className='lead'>{restaurant.rating ? restaurant.rating : 'Not rated'}</p>
      </div>
    )

  }
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired
};

export default Restaurant;
