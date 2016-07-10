require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Restaurant from './Restaurant';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Restaurant title="Test title" address="Test address" rating="5"
                    hours="24/7"/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
