import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Geosuggest from 'react-geosuggest';

import * as pageActions from '../../actions/pageActions';

import './style.scss';
import '../../components/Geosuggest/style.scss';

class App extends Component {
  render() {
    const types = ['(cities)'];
    const {setCity} = this.props.pageActions;

    const geosuggest = <Geosuggest autoFocus
                                   id='geosuggest-id'
                                   onSuggestSelect={setCity}
                                   placeholder='Enter any city e.g. New York'
                                   types={types}/>;

    return (
      <div className='homepage'>
        <label htmlFor='geosuggest-id' className='geosuggest-label'>Search for cool places:</label>
        {geosuggest}
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
