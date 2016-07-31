import React, {Component, PropTypes} from 'react';

import './style.scss';

class WorkingHours extends Component {
  render() {
    const {weekdayText} = this.props;

    let weekdaysTemplate;

    let dayInd = (new Date()).getDay();

    dayInd -= 1;

    dayInd = dayInd < 0 ? 6 : dayInd;

    weekdaysTemplate = weekdayText.map((text, ind) => {
      let appendClass = dayInd === ind ? 'hours-item_active' : '';
      return (
        <div key={ind} className={`hours-list__item hours-item ${appendClass}`}>
          <p className='hours-item__text'>{text}</p>
        </div>
      )

    });

    return (
      <div className='hours-list'>
        {weekdaysTemplate}
      </div>

    )
  }
}

WorkingHours.propTypes = {
  weekdayText: PropTypes.array
};

export default WorkingHours;
