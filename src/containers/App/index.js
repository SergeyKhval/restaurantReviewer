import React, {Component} from 'react';
import {connect} from 'react-redux';
import Geosuggest from 'react-geosuggest';
import './main.scss';
import '../../components/Geosuggest/style.scss';

class App extends Component {
  handleSuggest(value) {
    console.log(value);
  }

  render() {
    const types = ['(cities)']
    return (
      <div className='container'>
        <Geosuggest types={types} onSuggestSelect={this.handleSuggest}/>
      </div>
    )
  }
}

export default connect()(App);
