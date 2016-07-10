require('normalize.css/normalize.css');
require('./main.scss');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="search-field">
        <input type="text" className="search-field__input" placeholder="Search for places near you" />
        <button className="search-field__button">Search!</button>
      </div>

    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
