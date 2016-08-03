import React, {Component, ProppTypes} from 'react'
import Geosuggest from 'react-geosuggest';

class Header extends Component {
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
          </div>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  setCity: ProppTypes.func.isRequired
};

export default Header;
