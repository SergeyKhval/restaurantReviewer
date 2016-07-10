'use strict';

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
          <li class="info-list__item">{this.props.title}</li>
          <li class="info-list__item">{this.props.address}</li>
          <li class="info-list__item">{this.props.rating}</li>
          <li class="info-list__item">{this.props.hours}</li>
        </ul>
      </div>
    );
  }
}

export default Restaurant;
