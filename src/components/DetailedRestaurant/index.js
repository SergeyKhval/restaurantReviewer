import React, {Component} from 'react';

class DetailedRestaurant extends Component {
  render() {
    const placeId = this.props.params.id;
    console.log(placeId);

    return (
      <div>Detailed restaurant</div>
    )
  }
}

export default DetailedRestaurant;
