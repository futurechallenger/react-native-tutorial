/**
 * A test reducer
 */
import {combineReducers} from 'redux';

const defaultState = {
  loadDone: false,
  error: false,
}

function testReducer(state = defaultState, action) {
  if(action.type === 'LOAD_DATA') {
    return {
      loadDone: true,
    }
  }

  return state;
}

export default combineReducers({
  test: testReducer,
});