import React, {Component, PropTypes} from 'react';

class Restaurant extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.setRestaurant(this.props.restaurant.place_id);
  }

  render() {
    const {restaurant} = this.props;
    let imgUrl = restaurant.photos ? restaurant.photos[0].getUrl({'maxWidth': 256, 'maxHeight': 256}) : '';

    return (
      <div>
        <h3><a href={`/restaurants/${restaurant.place_id}`} onClick={::this.handleClick}>{restaurant.name}</a></h3>
        <p className='lead'>{restaurant.rating ? restaurant.rating : 'Not rated'}</p>
        <img src={imgUrl} alt={restaurant.name}/>
      </div>
    )

  }
}

Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired
};

export default Restaurant;
