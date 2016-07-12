require('normalize.css/normalize.css');
require('./main.scss');
require('./geosuggest/geosuggest.scss');

import React from 'react';
import Geosuggest from 'react-geosuggest';

class AppComponent extends React.Component {
  render() {
    return (
      <Geosuggest autofocus/>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
