import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Aboutus from "./AboutComponent";
import Contact from "./ContactComponent";
import RestarauntsList from "./RestarauntListComponent";
import RestarauntDetail from "./Restarauntmenu";
import RegisterUser from "./RegisterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<><Header />
            <TransitionGroup>
                <CSSTransition
                    key={this.props.location.key}
                    classNames="page"
                    timeout={300}
                >
                    <Switch location={this.props.location}>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/aboutus" component={Aboutus} />
                        <Route exact path="/contactus" component={Contact} />
                        <Route exact path="/restaraunts" component={RestarauntsList} />
                        <Route exact path="/restmenu" component={RestarauntDetail} />
                        <Route exact path="/register" component={RegisterUser} />
                        <Redirect to="/home" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer />
        </>);
    }
}

export default withRouter(Main);