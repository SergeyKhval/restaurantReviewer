'use strict';

import React, {Component} from 'react';
import $ from 'jquery';

import './style.scss';

class StarsInput extends Component {
  handleChange(e) {
    const $radio = $(e.target);
    $('.rating .selected').removeClass('selected');
    $radio.closest('label').addClass('selected');
  }

  handleFocus(e) {
    $(e.target).closest('.rating').addClass('rating_focus');
  }

  handleBlur(e) {
    $(e.target).closest('.rating').removeClass('rating_focus');
  }

  render() {
    return (
      <div className='rating'>
        <label>
          <input type='radio' name='rating' value='5' title='5 stars' required onChange={::this.handleChange}
                 onFocus={::this.handleFocus} onBlur={::this.handleBlur}/> 5
        </label>
        <label>
          <input type='radio' name='rating' value='4' title='4 stars' onChange={::this.handleChange}
                 onFocus={::this.handleFocus} onBlur={::this.handleBlur}/> 4
        </label>
        <label>
          <input type='radio' name='rating' value='3' title='3 stars' onChange={::this.handleChange}
                 onFocus={::this.handleFocus} onBlur={::this.handleBlur}/> 3
        </label>
        <label>
          <input type='radio' name='rating' value='2' title='2 stars' onChange={::this.handleChange}
                 onFocus={::this.handleFocus} onBlur={::this.handleBlur}/> 2
        </label>
        <label>
          <input type='radio' name='rating' value='1' title='1 star' onChange={::this.handleChange}
                 onFocus={::this.handleFocus} onBlur={::this.handleBlur}/> 1
        </label>
      </div>
    )
  }
}

export default StarsInput;

