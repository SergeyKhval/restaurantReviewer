import {browserHistory} from 'react-router'
import {REDIRECT} from '../constants/redirect'

export const redirect = store => next => action => { //eslint-disable-line no-unused-vars
  if (action.type === REDIRECT) {
    browserHistory[action.payload.method](action.payload.nextUrl)
  }

  return next(action)
};
