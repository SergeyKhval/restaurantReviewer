import React, {Component} from 'react';
import {connect} from 'react-redux';

//Component styles
import './style.scss';

class DetailedRestaurant extends Component {
  componentWillMount() {
    window.scrollTo({top: 0});
  }

  render() {
    const {name, photos, reviews, website, formatted_address, formatted_phone_number} = this.props.restaurant;

    let headPhoto = photos ? photos.shift().getUrl({'maxWidth': 1200}) : '';

    let reviewsTemplate = reviews.map((review, index) => {
      return (
        <div key={index}>
          <h4>{review.author_name}</h4>
          <p className='lead'>{review.text}</p>
          <p>Rating: {review.rating}</p>
        </div>
      )
    });

    let imagesTemplate = photos ? photos.map((photo, index) => {
      let imgUrl = photo.getUrl({'maxWidth': 300, 'maxHeight': 300});

      return (
        <div className='col-md-4' key={index}>
          <img className='img-thumbnail img-responsive' src={imgUrl} alt={name}/>
        </div>
      )
    }) : 'There are no pictures of this place yet';

    return (
      <div>
        <div className='restaurant-heading' style={{backgroundImage: `url(${headPhoto})`}}>
          <p className='restaurant-heading__info'>{name}</p>
          {website ? <p className='restaurant-heading__info'><a href={website}>Our website</a></p> : null}
          <p className='restaurant-heading__info'>{formatted_address}</p>
          <p className='restaurant-heading__info'>{formatted_phone_number}</p>
        </div>
        <div className='row'>
          {imagesTemplate}
        </div>

        {reviewsTemplate}
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    restaurant: state.restaurant.restaurant
  }
}

export default connect(mapStateToProps)(DetailedRestaurant);
