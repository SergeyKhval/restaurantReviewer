import React, {Component, PropTypes} from 'react';
import Geosuggest from 'react-geosuggest';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pageActions from '../../actions/pageActions';

import Restaurant from '../../components/Restaurant';
import Footer from '../../components/Footer';

import './style.scss';

class RestaurantList extends Component {
  handleMoreClick() {
    let {pagination} = this.props;

    if (pagination.hasNextPage) {
      pagination.nextPage();
    }

  }

  render() {
    const {restaurants, pagination} = this.props;
    const {setRestaurant, setCity} = this.props.pageActions;

    const types = ['(cities)'];

    return (
      <div className='container'>
        <div className='row'>
          <nav className='navbar navbar-default'>
            <div className='container-fluid'>
              <div className='navbar-header'>
                <button type='button' className='navbar-toggle collapsed' data-toggle='collapse'
                        data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                  <span className='sr-only'>Toggle navigation</span>
                  <span className='icon-bar'/>
                  <span className='icon-bar'/>
                  <span className='icon-bar'/>
                </button>
                <a className='navbar-brand' href='/'>Restik</a>
              </div>

              <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                <form className='navbar-form navbar-left'>
                  <div className='form-group'>
                    <Geosuggest className='geosuggest_unstyled' types={types} onSuggestSelect={setCity}/>
                  </div>
                </form>
              </div>
            </div>
          </nav>
          {restaurants.map(restaurant => {
            return (
              <div key={restaurant.id} className='col-md-4'>
                <Restaurant restaurant={restaurant} setRestaurant={setRestaurant}/>
              </div>
            )
          })}

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
