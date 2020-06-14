import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Aboutus from "./AboutComponent";
import Contact from "./ContactComponent";
import RestarauntsList from "./RestarauntListComponent";
import RestarauntDetail from "./Restarauntmenu";
import RegisterUser from "./RegisterComponent";
import AddRestaraunt from "./AddRestaraunt";
import RestarauntLogin from "./RestarauntLogin";
import RestProfile from './RestarauntProfile';
import UserProfile from './UserProfile';
import Cart from "./ShoppingCart";
import AddDish from './AddDishComponent';
import Orders from './ResOrders';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { loginUser, LogOutUser, alreadyLoggedin, resLogin, alreadyLoggedinRes } from "../redux/ActionCreator";
import { actions } from "react-redux-form";



const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => {
        dispatch(loginUser(email, password));
    },
    LogOutUser: () => {
        dispatch(LogOutUser());
    },
    alreadyLoggedin: () => {
        dispatch(alreadyLoggedin());
    },
    resLogin: (email, password) => {
        dispatch(resLogin(email, password));
    },
    alreadyLoggedinRes: () => {
        dispatch(alreadyLoggedinRes());
    },
    resetUserDetails: () => {
        dispatch(actions.reset("registeruser"));
    },
    resetRestarauntDetails: () => {
        dispatch(actions.reset("registerres"));
    }

})

class Main extends Component {

    componentDidMount() {
        if (localStorage.getItem("foodshalakey") && !this.props.user.LoggedIn) {
            this.props.alreadyLoggedin();
        }
        if (localStorage.getItem("foodshalareskey") && !this.props.user.LoggedIn) {
            this.props.alreadyLoggedinRes();
        }
    }

    render() {
        console.log(this.props);
        return (<><Header
            loginUser={this.props.loginUser}
            LogOutUser={this.props.LogOutUser}
            user={this.props.user} />
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
                        <Route exact path="/addrestaraunt" component={() => <AddRestaraunt resetRestarauntDetails={this.props.resetRestarauntDetails} />} />
                        <Route exact path="/register" component={() => <RegisterUser resetUserDetails={this.props.resetUserDetails} />} />
                        <Route exact path="/reslogin" component={() => <RestarauntLogin resLogin={this.props.resLogin} />} />
                        <Route exact path="/resprofile" component={() => <RestProfile user={this.props.user} />} />
                        <Route exact path="/userprofile" component={() => <UserProfile user={this.props.user} />} />
                        <Route exact path="/adddish" component={AddDish} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/resorders" component={Orders} />
                        <Redirect to="/home" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer />
        </>);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
