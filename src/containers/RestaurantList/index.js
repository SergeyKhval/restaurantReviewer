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
    let {pagination} = this.props;

    if (pagination.hasNextPage) {
      pagination.nextPage();
    }

  }

  // componentWillMount() {
  //   this.props.pageActions.setCity(this.props.params.cityId);
  // }

  render() {
    const {restaurants, pagination} = this.props;
    const {setRestaurant, setCity} = this.props.pageActions;

    let restaurantsTemplate = restaurants.map(restaurant => {
      return (
        <Restaurant key={restaurant.id} restaurant={restaurant} setRestaurant={setRestaurant}/>
      )
    });


    return (
      <div className='container'>
        <div className='row'>
          <Header setCity={setCity}/>
          {restaurantsTemplate}
          <div className='col-xs-12'>
            <button className='btn btn-primary' onClick={::this.handleMoreClick} disabled={!pagination.hasNextPage}>Load
              more
            </button>
          </div>
        </div>
        <Footer/>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    restaurants: state.city.restaurants,
    pagination: state.city.pagination
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

RestaurantList.propTypes = {
  city: PropTypes.object.isRequired
};

export default  connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
