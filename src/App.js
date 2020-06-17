import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { storeConfig } from "./redux/ConfigureStore";
const store = storeConfig();


class App extends Component {
  render() {

    return (<Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>)
  }
}


export default App;
