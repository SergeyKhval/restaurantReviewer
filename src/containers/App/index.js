import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Geosuggest from 'react-geosuggest';
import City from '../../components/City';

import * as pageActions from '../../actions/pageActions';

import './main.scss';
import '../../components/Geosuggest/style.scss';

class App extends Component {
  render() {
    const types = ['(cities)'];
    const {city} = this.props;
    const {setCity} = this.props.pageActions;

    return (
      <div className='container'>
        <Geosuggest types={types} onSuggestSelect={setCity}/>
        <City name={city.name} lat={city.lat} lng={city.lng} restaurants={city.restaurants}/>


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

export default connect(mapStateToProps, mapDispatchToProps)(App);
