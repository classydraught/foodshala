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
import AddDish from './AddDishComponent';
import Orders from './ResOrders';
import UserOrders from "./UserOrders";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { loginUser, LogOutUser, alreadyLoggedin, resLogin, alreadyLoggedinRes, fetchRestraunts, fetchDishes, addNewRestaraunt, addNewDish, addtoCart, placeOrder } from "../redux/ActionCreator";
import { actions } from "react-redux-form";



const mapStateToProps = state => {
    return {
        user: state.user,
        dishes: state.dishes,
        restaraunts: state.restaraunts,
        cart: state.cart
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
    fetchRestraunts: () => {
        dispatch(fetchRestraunts());
    },
    fetchDishes: () => {
        dispatch(fetchDishes());
    },
    addNewRestaraunt: restaraunt => {
        dispatch(addNewRestaraunt(restaraunt));
    },
    addNewDish: dish => {
        dispatch(addNewDish(dish))
    },
    addtoCart: (dishId, resID) => {
        dispatch(addtoCart(dishId, resID))
    },
    resetUserDetails: () => {
        dispatch(actions.reset("registeruser"));
    },
    resetRestarauntDetails: () => {
        dispatch(actions.reset("registerres"));
    },
    resetDishDetails: () => {
        dispatch(actions.reset("addDish"));
    },
    placeOrder: (dishes) => {
        dispatch(placeOrder(dishes))
    }

})

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchRestraunts();
        if (localStorage.getItem("foodshalakey") && !this.props.user.LoggedIn) {
            this.props.alreadyLoggedin();
        }
        if (localStorage.getItem("foodshalareskey") && !this.props.user.LoggedIn) {
            this.props.alreadyLoggedinRes();
        }
    }

    render() {
        const RestarauntDetailId = ({ match }) => {
            return (
                <RestarauntDetail
                    user={this.props.user}
                    restaraunt={
                        this.props.restaraunts.restaraunts.filter(
                            restaraunt => restaraunt._id === match.params.resId
                        )[0]
                    }
                    addtoCart={this.props.addtoCart}
                    isLoading={this.props.restaraunts.isLoading}
                    errMess={this.props.restaraunts.errMess}
                    dishes={this.props.dishes.dishes.filter(
                        dish => dish.resId === match.params.resId
                    )}
                    disheserrMess={this.props.dishes.errMess}
                    placeOrder={this.props.placeOrder}
                />
            );
        };
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
                        <Route exact path="/restaraunts" component={() => <RestarauntsList restaraunts={this.props.restaraunts} user={this.props.user} />} />
                        <Route path="/restaraunts/:resId" component={RestarauntDetailId} />
                        <Route exact path="/addrestaraunt" component={() => <AddRestaraunt resetRestarauntDetails={this.props.resetRestarauntDetails} addNewRestaraunt={this.props.addNewRestaraunt} />} />
                        <Route exact path="/register" component={() => <RegisterUser resetUserDetails={this.props.resetUserDetails} />} />
                        <Route exact path="/reslogin" component={() => <RestarauntLogin resLogin={this.props.resLogin} />} />
                        <Route exact path="/resprofile" component={() => <RestProfile user={this.props.user} />} />
                        <Route exact path="/userprofile" component={() => <UserProfile user={this.props.user} />} />
                        <Route exact path="/adddish" component={() => <AddDish user={this.props.user} addNewDish={this.props.addNewDish} resetDishDetails={this.props.resetDishDetails} />} />
                        <Route exact path="/userorders" component={() => <UserOrders user={this.props.user} />} />
                        <Route exact path="/resorders" component={() => <Orders user={this.props.user} />} />
                        <Redirect to="/home" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer />
        </>);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
