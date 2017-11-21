import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promise from './promise';
import reducers from './reducers';

var isDebugInChrome = __DEV__ || !!window.navigator.userAgent;
var logger = createLogger({
  predicate: (getState, action) => isDebugInChrome,
  collapsed: true,
  duration: true,
});

// var createAppStore = applyMiddleware(thunk, promise, logger)(createStore);

/**
 * onComplete makes no sense now. 
 * Maybe use cache some day, then `onComplete` callback will be cool.
 */
export default (onComplete) => {
  if (onComplete) {
    onComplete();
  }
  return createStore(reducers, applyMiddleware(thunk, promise, logger));
}