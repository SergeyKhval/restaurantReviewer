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

  fetchCityInfo() {
    this.props.pageActions.fetchCityInfo(this.props.params.cityId);
  }

  componentWillMount() {
    this.props.pageActions.clearRestaurants();
    this.props.pageActions.fetchRestaurants(this.props.params.cityId);
  }

  render() {
    const {restaurants, pagination} = this.props.restaurantList;
    const {label} = this.props.city;
    const {setRestaurant, setPlaceType, fetchRestaurants, setCity, setSelfLocation} = this.props.pageActions;

    const cityName = label || this.fetchCityInfo();

    let restaurantsTemplate = restaurants.map(restaurant => {
      return (
        <Restaurant key={restaurant.id} restaurant={restaurant} setRestaurant={setRestaurant}/>
      )
    });

    return (
      <div className='container'>
        <Header fetchRestaurants={fetchRestaurants} setPlaceType={setPlaceType} setCity={setCity}
                setSelfLocation={setSelfLocation}/>
        <main className='row'>
          <header className='col-xs-12'>
            <h1>Places in {cityName}</h1>
          </header>
          {restaurantsTemplate}
          <footer className='col-xs-12'>
            <button className='btn btn-primary' onClick={::this.handleMoreClick} disabled={!pagination.hasNextPage}>Load
              more
            </button>
          </footer>
        </main>
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
