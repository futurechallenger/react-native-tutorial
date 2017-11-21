import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';

export default function setup() {
  class Root extends React.Component {
    // constructor(props) {
    //   super(props)

    //   this.state = {
    //     isLoading: true,
    //     store: configureStore(/*() => this.setState({ isLoading: false })*/),
    //   };
    // }
    render() {
      // if (this.state.isLoading) {
      //   return null; //TODO: or some landing page
      // }

      return (
        <Provider store={configureStore()}>
          <App />
        </Provider>
      );
    }
  }
  
  return Root;
}