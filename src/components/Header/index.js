import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router';
import Geosuggest from 'react-geosuggest';

//styles
import './style.scss';

class Header extends Component {
  handleTypeChange(e) {
    this.props.setPlaceType(e.target.value);
    this.props.fetchRestaurants();
  }

  handleSelfLocationChange(e) {
    this.props.setSelfLocation(e.target.checked);
  }

  handleSuggest(e) {
    this.props.setCity(e);
    this.props.fetchRestaurants();
  }

  render() {
    const types = ['(cities)'];

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <nav className='navbar navbar-default'>
            <div className='container-fluid'>
              <div className='navbar-header'>
                <button type='button' className='navbar-toggle collapsed' data-toggle='collapse'
                        data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
                  <span className='sr-only'>Toggle navigation</span>
                  <span className='icon-bar'/>
                  <span className='icon-bar'/>
                  <span className='icon-bar'/>
                </button>
                <Link className='navbar-brand' to='/'>Restik</Link>
              </div>

              <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
                <form className='navbar-form navbar-left'>
                  <div className='form-group'>
                    <Geosuggest id='header-search' className='geosuggest_unstyled' label='Search:' types={types}
                                onSuggestSelect={::this.handleSuggest}/>
                  </div>
                </form>
                <ul className='nav navbar-nav'>
                  <li>
                    <label className='radio-inline'>
                      <input type='radio' name='inlineRadioOptions' id='inlineRadio1' value='restaurant'
                             onChange={::this.handleTypeChange}/> Restaurants
                    </label>
                    <label className='radio-inline'>
                      <input type='radio' name='inlineRadioOptions' id='inlineRadio2' value='cafe'
                             onChange={::this.handleTypeChange}/> Cafes
                    </label>
                    <label className='radio-inline'>
                      <input type='radio' name='inlineRadioOptions' id='inlineRadio3' value='bar'
                             onChange={::this.handleTypeChange}/> Bars
                    </label>
                  </li>
                  <li className='checkbox'>
                    <label htmlFor='self-geo-location'>
                      <input type='checkbox' id='self-geo-location' onChange={::this.handleSelfLocationChange}/>
                      Near me
                    </label>
                  </li>
                </ul>

              </div>
            </div>
          </nav>
        </div>
      </div>

    )
  }
}

Header.propTypes = {
  fetchRestaurants: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  setPlaceType: PropTypes.func.isRequired,
  setSelfLocation: PropTypes.func.isRequired
};

export default Header;
