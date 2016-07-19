'use strict';
require('./restaurant.scss');

import React from 'react';

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="restaurant">
        <div className="restaurant__img"></div>
        <ul className="restaurant__info info-list">
          <li className="info-list__item">{this.props.title}</li>
          <li className="info-list__item">{this.props.address}</li>
          <li className="info-list__item">{this.props.rating}</li>
          <li className="info-list__item">{this.props.hours}</li>
        </ul>
      </div>
    );
  }
}

export default Restaurant;
