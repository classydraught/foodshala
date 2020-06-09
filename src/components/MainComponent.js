import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect } from "react-router-dom";
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<><Header />
            <Switch>
                <Route exact path="/home" component={Home} />
                <Redirect to="/home" />
            </Switch>
            <Footer />
        </>);
    }
}

export default Main;