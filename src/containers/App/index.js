require('normalize.css/normalize.css');
// import './main.scss';

import React, {Component} from 'react';
import {Link} from 'react-router'

class App extends Component {
  render() {

    return (
      <div className="container">
        <ul className="nav nav-pills">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/restaurants">Restaurants</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;
