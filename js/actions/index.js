/**
 * A test action
 */
export function asyncAction() {
  return (dispatch) => {
    fetch('https://www.apple.com').then(
      dispatch(asyncFunc())
    )
  }
}

/**
 * Dispatch a function which will return a promise, to see if this would work with redux-thunk
 */
async function asyncFunc() {
  return {
    type: 'LOAD_DATA',
    title: 'hello async load data',
  };
}