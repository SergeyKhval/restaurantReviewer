import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    const {restaurants} = this.props.restaurants;

    return <div className='container'>
      <h1>
        Привет из App!
      </h1>
      {restaurants.map((restaurant, ind) => {
        return (
          <div key={ind}>
            <h3>{restaurant.name}</h3>
          </div>
        )
      })}
    </div>
  }
}

App.propTypes = {
  restaurants: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    restaurants: state.restaurants
  }
}

export default connect(mapStateToProps)(App);
