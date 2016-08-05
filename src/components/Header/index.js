import React, {Component, PropTypes} from 'react'
import Geosuggest from 'react-geosuggest';

class Header extends Component {
  handleChange(e) {
    this.props.setPlaceType(e.target.value);
    this.props.setCity(this.props.city);
  }

  render() {
    const types = ['(cities)'];

    return (
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
            <a className='navbar-brand' href='/'>Restik</a>
          </div>

          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <form className='navbar-form navbar-left'>
              <div className='form-group'>
                <Geosuggest className='geosuggest_unstyled' types={types} onSuggestSelect={this.props.setCity}/>
              </div>
            </form>
            <ul className='nav navbar-nav'>
              <li>
                <label className='radio-inline'>
                  <input type='radio' name='inlineRadioOptions' id='inlineRadio1' value='restaurant'
                         onChange={::this.handleChange}/> Restaurants
                </label>
                <label className='radio-inline'>
                  <input type='radio' name='inlineRadioOptions' id='inlineRadio2' value='cafe'
                         onChange={::this.handleChange}/> Cafes
                </label>
                <label className='radio-inline'>
                  <input type='radio' name='inlineRadioOptions' id='inlineRadio3' value='bar'
                         onChange={::this.handleChange}/> Bars
                </label>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  setCity: PropTypes.func.isRequired,
  setPlaceType: PropTypes.func.isRequired
};

export default Header;
