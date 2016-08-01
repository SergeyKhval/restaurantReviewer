import React, {Component} from 'react';

import './style.scss';

class Footer extends Component {
  render() {
    return (
      <footer className='footer-main row text-center'>
        <div className='col-md-4'>
          <ul className='nav nav-pills nav-stacked'>
            <li><a href='/'>© 2016 Restik</a></li>
          </ul>
        </div>
        <div className='col-md-4'>
          <ul className='nav nav-pills nav-stacked'>
            <li><a href='https://twitter.com/HiIAmGluk'>Follow us</a></li>
          </ul>
        </div>
        <div className='col-md-4'>
          <ul className='nav nav-pills nav-stacked'>
            <li><a href='mailto:sergeykhval@gmail.com'>Contact us</a></li>
          </ul>
        </div>
      </footer>
    )
  }
}

export default Footer;
