import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <div className='container text-center'>
        <hr />
        <div className='row'>
          <div className='col-lg-12'>
            <div className='col-md-3'>
              <ul className='nav nav-pills nav-stacked'>
                <li><a href='#'>About us</a></li>
                <li><a href='#'>Blog</a></li>
              </ul>
            </div>
            <div className='col-md-3'>
              <ul className='nav nav-pills nav-stacked'>
                <li><a href='#'>Product for Mac</a></li>
                <li><a href='#'>Product for Windows</a></li>
              </ul>
            </div>
            <div className='col-md-3'>
              <ul className='nav nav-pills nav-stacked'>
                <li><a href='#'>Web analytics</a></li>
                <li><a href='#'>Presentations</a></li>
              </ul>
            </div>
            <div className='col-md-3'>
              <ul className='nav nav-pills nav-stacked'>
                <li><a href='#'>Product Help</a></li>
                <li><a href='#'>Developer API</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-lg-12'>
            <ul className='nav nav-pills nav-justified'>
              <li><a href='/'>© 2013 Company Name.</a></li>
              <li><a href='#'>Terms of Service</a></li>
              <li><a href='#'>Privacy</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;
