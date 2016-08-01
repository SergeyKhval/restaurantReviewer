import React, {Component} from 'react';

import './style.scss';
import img from '../../assets/powered_by_google_on_white.png';

class Footer extends Component {
  render() {
    return (
      <footer className='footer-main row text-center'>
        <div className='col-md-3'>
          <ul className='nav nav-pills nav-stacked'>
            <li><a href='/'>© 2016 Restik</a></li>
          </ul>
        </div>
        <div className='col-md-3'>
          <ul className='nav nav-pills nav-stacked'>
            <li><a href='https://twitter.com/HiIAmGluk'>Follow us</a></li>
          </ul>
        </div>
        <div className='col-md-3'>
          <ul className='nav nav-pills nav-stacked'>
            <li><a href='mailto:sergeykhval@gmail.com'>Contact us</a></li>
          </ul>
        </div>
        <col-md-3>
          <ul className='nav nav-pills nav-stacked'>
            <li><a href='https://google.com'><img src={img} alt='Google'/></a></li>
          </ul>
        </col-md-3>
      </footer>
    )
  }
}

export default Footer;
