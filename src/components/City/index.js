import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import RestaurantList from '../RestaurantList';

class City extends Component {
  render() {
    const {name, lat, lng, restaurants} = this.props.city;
    return (
      <div className='city'>
        <p>{name}</p>
        <p>{lat} {lng}</p>
        <RestaurantList restaurants={restaurants}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    city: state.city
  }
}

City.propTypes = {
  city: PropTypes.object.isRequired
};

export default  connect(mapStateToProps)(City);
