import React, { Component } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { storeConfig } from "./redux/ConfigureStore";
const store = storeConfig();

//Store provides single source of data 
// to the whole appication and anywhere 
// inside app any change to the state occurs 
// it will reflect to all its child components 
// there by maintaining persistant state

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
