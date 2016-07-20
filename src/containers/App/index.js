import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Geosuggest from 'react-geosuggest';

import * as pageActions from '../../actions/pageActions';

import './main.scss';
import '../../components/Geosuggest/style.scss';

class App extends Component {
  render() {
    const types = ['(cities)'];
    const city = this.props.city;
    const {setCity} = this.props.pageActions;

    return (
      <div className='container'>
        <Geosuggest types={types} onSuggestSelect={setCity}/>
        <p>{city.name} {city.id}</p>
        <p>{city.lat} {city.lng}</p>
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
