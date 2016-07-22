import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {redirect} from '../middleware/redirect';

export default function configureStore(initialState) {
  let logger = createLogger();

  const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger, redirect));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
