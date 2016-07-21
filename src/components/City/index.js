import React, {Component, PropTypes} from 'react';
import RestaurantList from '../RestaurantList';

class City extends Component {
  render() {
    const {name, lat, lng, restaurants} = this.props;
    return (
      <div className='city'>
        <p>{name}</p>
        <p>{lat} {lng}</p>
        <RestaurantList restaurants={restaurants}/>
      </div>
    )
  }
}

City.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  restaurants: PropTypes.array.isRequired
};

export default  City;
