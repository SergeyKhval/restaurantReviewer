import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal} from 'react-bootstrap';
import Review from '../Review';
import * as actions from '../../actions/detailedRestaurantActions';

//Component styles
import './style.scss';

class DetailedRestaurant extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  openModal() {
    this.props.actions.toggleModal(true);
  }

  closeModal() {
    this.props.actions.toggleModal(false);
  }

  render() {
    const {name, photos, reviews, website, formatted_address, formatted_phone_number} = this.props.restaurant;
    const {reviewModalOpen} = this.props;

    let headPhoto = photos ? photos.shift().getUrl({'maxWidth': 1200}) : '';

    let reviewsTemplate = reviews.map((review, index) => {
      return (
        <div key={index}>
          <Review author={review.author_name} text={review.text} rating={review.rating}/>
        </div>
      )
    });

    let imagesTemplate = photos ? photos.map((photo, index) => {
      let imgUrl = photo.getUrl({'maxWidth': 300, 'maxHeight': 300});

      return (
        <img key={index} src={imgUrl} alt={name}/>
      )
    }) : 'There are no pictures of this place yet';

    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='restaurant-heading' style={{backgroundImage: `url(${headPhoto})`}}>
                <p className='restaurant-heading__info'>{name}</p>
                {website ? <p className='restaurant-heading__info'><a href={website}>Our website</a></p> : null}
                <p className='restaurant-heading__info'>{formatted_address}</p>
                <p className='restaurant-heading__info'>{formatted_phone_number}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              {imagesTemplate}
              {reviewsTemplate}
              <Button bsStyle='primary' onClick={this.openModal.bind(this)}>Add review</Button>
              <Modal show={reviewModalOpen}>
                <Modal.Header>test</Modal.Header>
                <Modal.Body>Test</Modal.Body>
                <Modal.Footer>Test</Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    restaurant: state.restaurant.restaurant,
    reviewModalOpen: state.ui.reviewModalOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedRestaurant);
