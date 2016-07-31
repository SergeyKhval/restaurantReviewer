import React, {Component, PropTypes} from 'react';
import Geosuggest from 'react-geosuggest';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as pageActions from '../../actions/pageActions';

import Restaurant from '../../components/Restaurant';

import './style.scss';

class RestaurantList extends Component {
  render() {
    const {restaurants} = this.props.city;
    const {setRestaurant} = this.props.pageActions;

    let sortedRestaurants = restaurants
      .sort((a, b) => {
        return parseFloat(b.rating) - parseFloat(a.rating);
      });

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
                    <Geosuggest />
                  </div>
                </form>
              </div>
            </div>
          </nav>
          {sortedRestaurants.map(restaurant => {
            return (
              <div key={restaurant.id} className='col-md-4'>
                <Restaurant restaurant={restaurant} setRestaurant={setRestaurant}/>
              </div>
            )
          })}
        </div>
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

RestaurantList.propTypes = {
  city: PropTypes.object.isRequired
};

export default  connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
