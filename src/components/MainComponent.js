import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<><Header />

            <Home /></>);
    }
}

export default Main;