import React, {Component, PropTypes} from 'react';

import './style.scss';

class WorkingHours extends Component {
  render() {
    const {weekdayText} = this.props;

    let weekdaysTemplate;

    let dayInd = (new Date()).getDay() - 1;

    dayInd = dayInd < 0 ? 6 : dayInd;

    if (weekdayText.length) {
      weekdaysTemplate = weekdayText.map((text, ind) => {
        let appendClass = dayInd === ind ? 'hours-item_active' : '',
          textArr = text.split(': '),
          day = textArr[0],
          hours = textArr[1];

        return (
          <div key={ind} className={`hours-list__item hours-item ${appendClass}`}>
            <h4 className='hours-item__day'>{day}</h4>
            <p className='hours-item__day'>{hours}</p>
          </div>
        )

      });
    } else {
      weekdaysTemplate = (<p className='lead'>Working hours unavailable</p>)
    }


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
