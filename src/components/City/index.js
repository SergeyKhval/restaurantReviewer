import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pageActions from '../../actions/pageActions';
import RestaurantList from '../RestaurantList';

class City extends Component {
  render() {
    const {name, lat, lng, restaurants} = this.props.city;
    const {setRestaurant} = this.props.pageActions;

    return (
      <div className='city'>
        <p>{name}</p>
        <p>{lat} {lng}</p>
        <RestaurantList restaurants={restaurants} setRestaurant={setRestaurant}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    city: state.city
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

City.propTypes = {
  city: PropTypes.object.isRequired
};

export default  connect(mapStateToProps, mapDispatchToProps)(City);
