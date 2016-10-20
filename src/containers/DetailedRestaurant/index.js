import Firebase from 'firebase';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Modal} from 'react-bootstrap';
import Review from '../../components/Review';
import WorkingHours from '../../components/WorkingHours';
import StarsInput from '../../components/StarsInput';
import StarRating from '../../components/StarRating';
import Footer from '../../components/Footer';
import * as actions from '../../actions/detailedRestaurantActions';
import * as pageActions from '../../actions/pageActions';

//Component styles
import './style.scss';

class DetailedRestaurant extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.pageActions.setRestaurant(this.props.params.restaurantId);
    this.props.actions.getReviews(this.props.params.restaurantId);
  }

  openModal() {
    this.props.actions.toggleModal(true);
  }

  addReview(event) {
    event.preventDefault();

    this.props.actions.addReview({
      review: event.target.elements.review.value,
      rating: event.target.elements.rating.value,
      author: event.target.elements.author.value,
      date: Firebase.database.ServerValue.TIMESTAMP
    }, this.props.params.restaurantId);
  }

  closeModal() {
    this.props.actions.toggleModal(false);
  }

  render() {
    const {name, photos, reviews, website, formatted_address, formatted_phone_number, rating} = this.props.restaurant;
    const {weekday_text} = this.props.restaurant.opening_hours ? this.props.restaurant.opening_hours : {};
    const {reviewModalOpen} = this.props;
    const {firebaseReviews} = this.props;

    let headPhoto = photos ? photos[0].getUrl({'maxWidth': 1200}) : '',
      firebaseReviewsTemplate,
      reviewsTemplate;

    if (Object.keys(firebaseReviews).length) {
      firebaseReviewsTemplate = Object.keys(firebaseReviews).map((key, index) => {
        let review = firebaseReviews[key];
        return (
          <Review key={index} text={review.review} rating={+review.rating} author={review.author} date={review.date}/>
        )
      });
    }


    if (reviews.length) {
      reviewsTemplate = reviews.map((review, index) => {
        return (
          <Review key={index} author={review.author_name} text={review.text} rating={+review.rating}
                  date={review.time * 1000}/>
        )
      });
    }


    return (
      <div>
        <header className='container-fluid'>
          <div className='row'>
            <div className='restaurant-heading' style={{backgroundImage: `url(${headPhoto})`}}>
              {website ?
                <h1 className='restaurant-heading__title'>
                  <a href={website} target='_blank'>{name} <span className='glyphicon glyphicon-new-window'/></a>
                </h1> :
                <h1 className='restaurant-heading__title'>{name}</h1>}
              <p className='restaurant-heading__info'>
                <a href={`http://maps.google.com/?q=${formatted_address}`} target='_blank'>
                  <span className='glyphicon glyphicon-map-marker'/>
                  &nbsp;
                  {formatted_address}
                  &nbsp;
                  <span className='glyphicon glyphicon-new-window'/>
                </a>
              </p>
              <p className='restaurant-heading__info'>
                <a href={`tel:${formatted_phone_number}`} aria-label={`Call ${name} at ${formatted_phone_number}`}>
                  <span className='glyphicon glyphicon-earphone'/>
                  &nbsp;
                  {formatted_phone_number}
                </a>
              </p>
              <div className='restaurant-heading__rating'>
                <StarRating rating={+rating}/>
              </div>
            </div>
          </div>
        </header>
        <main className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <section className='panel panel-primary'>
                <h2 className='panel-heading panel-heading_header'>
                  Working hours
                </h2>
                <div className='panel-body'>
                  <WorkingHours weekdayText={weekday_text ? weekday_text : []}/>
                </div>
              </section>
              <section className='panel panel-primary'>
                <h2 className='panel-heading panel-heading_header'>
                  Reviews
                </h2>
                <div className='panel-body'>
                  <p><Button bsStyle='primary' onClick={::this.openModal}>Add review</Button></p>
                  {firebaseReviewsTemplate}
                  {reviewsTemplate}
                </div>

              </section>
              <Modal show={reviewModalOpen} autoFocus={true} enforceFocus={true} keyboard={true} backdrop={true}
                     onHide={::this.closeModal}>
                <Modal.Header closeButton={true} onHide={::this.closeModal}>Add your review</Modal.Header>
                <Modal.Body>
                  <form onSubmit={::this.addReview}>
                    <div className='form-group'>
                      <label htmlFor='author' className='control-label'>Name:</label>
                      <input type='text' id='author' name='author' className='form-control' placeholder='Your name'
                             required autoFocus/>
                    </div>
                    <div className='form-group'>
                      <label className='control-label' htmlFor='review'>Review</label>
                      <textarea className='form-control' name='review' id='review'
                                placeholder='What a marvelous place...' required/>
                    </div>
                    <div className='form-group'>
                      <p className='control-label'>Rating:</p>
                      <StarsInput/>
                    </div>
                    <div className='form-group text-right'>
                      <Button bsStyle='link' onClick={::this.closeModal}>Cancel</Button>
                      <Button bsStyle='primary' type='submit'>Add review</Button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <Footer/>
        </main>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    firebaseReviews: state.restaurant.reviews,
    restaurant: state.restaurant.restaurant,
    reviewModalOpen: state.ui.reviewModalOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedRestaurant);
