import React, {Component, PropTypes} from 'react';

class City extends Component {
  render() {
    const {name, lat, lng} = this.props;
    return (
      <div className='city'>
        <p>{name}</p>
        <p>{lat} {lng}</p>
      </div>
    )
  }
}

City.propTypes = {
  name: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
};

export default  City;
