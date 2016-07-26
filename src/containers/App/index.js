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
    const {setCity} = this.props.pageActions;

    return (
      <div className='homepage'>
        <Geosuggest autoFocus types={types} onSuggestSelect={setCity}/>
      </div>
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
