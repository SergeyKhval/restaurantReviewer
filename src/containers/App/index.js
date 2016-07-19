require('normalize.css/normalize.css');
import './main.scss';

import React, {Component} from 'react';

class App extends Component {
  render() {

    return (
      <div className="container">
        App
        <div className="row">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
