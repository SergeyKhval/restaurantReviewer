import React, {Component, PropTypes} from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pageActions from '../../actions/pageActions';

import Restaurant from '../../components/Restaurant';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './style.scss';

class RestaurantList extends Component {
  handleMoreClick() {
    let {pagination} = this.props.restaurantList;

    if (pagination.hasNextPage) {
      pagination.nextPage();
    }
  }

  getCityTitle(components) {
    return components.length ? components.filter(component => component.types.indexOf('locality') > -1).shift() : '';
  }

  componentWillMount() {
    //currently I can not come up with anything better than simply clearing restaurant list at every component mount
    this.props.pageActions.clearRestaurants();
    this.props.pageActions.fetchCityInfo(this.props.params.cityId);
    this.props.pageActions.fetchRestaurants(this.props.params.cityId);
  }

  render() {
    const {restaurants, pagination} = this.props.restaurantList;
    const {address_components} = this.props.city;
    const {setRestaurant, setPlaceType, fetchRestaurants, setCity, setSelfLocation} = this.props.pageActions;

    let restaurantsTemplate = restaurants.map(restaurant => {
      return (
        <Restaurant key={restaurant.id} restaurant={restaurant} setRestaurant={setRestaurant}/>
      )
    });

    let place = this.getCityTitle(address_components);

    return (
      <div className='container'>
        <Header fetchRestaurants={fetchRestaurants} setPlaceType={setPlaceType} setCity={setCity}
                setSelfLocation={setSelfLocation}/>
        <section className='row'>
          <div className='col-xs-12'>
            <h1>Places in {place.long_name}</h1>
          </div>
          {restaurantsTemplate}
          <div className='col-xs-12'>
            <button className='btn btn-primary' onClick={::this.handleMoreClick} disabled={!pagination.hasNextPage}>Load
              more
            </button>
          </div>
        </section>
        <Footer/>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    restaurantList: state.restaurantList,
    city: state.city
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

RestaurantList.propTypes = {
  restaurantList: PropTypes.object.isRequired
};

export default  connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
