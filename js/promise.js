/**
 * Deal with promise for redux-thunk
 */

 const warn = (error) => {
   console.warn(error.message || error);
   throw error;
 }

 export default (store) => (next) => (action) =>
  typeof action.then === 'function'
    ? Promise.resolve(action).then(next, warn)
    : next(action);