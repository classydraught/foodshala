import React, { Component } from "react";
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    Jumbotron,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import { baseUrl } from "../shared/baseUrl";
import { Divider } from '@material-ui/core';




class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isdropdownOpen: false,
            headingtext: "Hungry ?"
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.changeLine = this.changeLine.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    toggleDropdown() {
        this.setState({
            isdropdownOpen: !this.state.isdropdownOpen
        });
    }

    handleLogin(event) {
        event.preventDefault();
        this.toggleModal();
        this.props.loginUser(this.username.value, this.password.value);
    }

    changeLine(i) {
        const data = ["Hungry ?", "Cooking gone wrong ?", "Late night at office ?", "Unexpected guests ?", "Game night ?"]
        this.setState({ headingtext: data[i] })
    }
    componentDidMount() {
        var i = 1;
        setInterval(() => { this.changeLine(i); i = (i + 1) % 5; }, 1500);
    }

    render() {

        return (
            <>
                <div>
                    <Navbar dark expand="md" className="fixed-top">
                        <div className="container">
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="ml-auto" href="/">
                                <img
                                    src="assets/favicon.png"
                                    width="55"
                                    height="50"
                                    alt="foodshala"
                                />
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/home">
                                            <span className="fa fa-home fa-lg"></span> Home
                                   </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/restaraunts">
                                            <span className="fa fa-search fa-lg" aria-hidden="true"></span> Explore
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/aboutus">
                                            <span className="fa fa-info fa-lg"></span> About Us
                                   </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/contactus">
                                            <span className="fa fa-address-book-o fa-lg"></span> Contact
                                      </NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav className="ml-auto" navbar>
                                    {!this.props.user.LoggedIn ? <NavItem >
                                        <Button
                                            variant="outlined"
                                            style={{ color: "#fff" }}
                                            onClick={this.toggleModal}
                                        >
                                            <span className="fa fa-sign-in fa-lg"></span>{" "}
                                            &nbsp;&nbsp;Login
                                     </Button>
                                    </NavItem> : <NavItem>
                                            <Dropdown
                                                isOpen={this.state.isdropdownOpen}
                                                toggle={this.toggleDropdown}
                                            >
                                                <DropdownToggle>
                                                    <i className="fa fa-chevron-circle-down "></i>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {this.props.user.UserData.accountType === "User" ? <DropdownItem>
                                                        <Link
                                                            to="/userprofile"
                                                            style={{
                                                                color: "#0b0704",
                                                                textDecoration: "none"
                                                            }}
                                                        >
                                                            <Avatar
                                                                className="mx-auto mb-2"
                                                                src={
                                                                    baseUrl + this.props.user.UserData.profilepic
                                                                }
                                                            />
                                                        </Link>
                                                    </DropdownItem> :
                                                        <DropdownItem>
                                                            <Link
                                                                to="/resprofile"
                                                                style={{
                                                                    color: "#0b0704",
                                                                    textDecoration: "none"
                                                                }}
                                                            >
                                                                <Avatar
                                                                    className="mx-auto mb-2"
                                                                    src={
                                                                        baseUrl + this.props.user.UserData.respic
                                                                    }
                                                                />
                                                            </Link>
                                                        </DropdownItem>

                                                    }
                                                    <Divider />
                                                    {this.props.user.UserData.accountType === "User" ? <span></span>
                                                        : <DropdownItem>
                                                            <Link
                                                                to="/adddish"
                                                                style={{
                                                                    color: "#0b0704",
                                                                    textDecoration: "none"
                                                                }}
                                                            >
                                                                <i className="fa fa-plus-circle"></i>
                                                       &nbsp;&nbsp;Add a dish
                                                   </Link>
                                                        </DropdownItem>}

                                                    {this.props.user.UserData.accountType === "User" ? <DropdownItem>
                                                        <Link
                                                            to="/userorders"
                                                            style={{
                                                                color: "#0b0704",
                                                                textDecoration: "none"
                                                            }}
                                                        >
                                                            <i className="fa fa fa-first-order"></i>
                                                       &nbsp;&nbsp;My orders
                                                   </Link>
                                                    </DropdownItem> : <DropdownItem>
                                                            <Link
                                                                to="/resorders"
                                                                style={{
                                                                    color: "#0b0704",
                                                                    textDecoration: "none"
                                                                }}
                                                            >
                                                                <i className="fa fa fa-first-order"></i>
                                                       &nbsp;&nbsp;Active orders
                                                   </Link>
                                                        </DropdownItem>}
                                                    <DropdownItem
                                                        onClick={this.props.LogOutUser}
                                                        color="#0b0704"
                                                    >
                                                        <i className="fa fa-sign-out"></i> Logout
                                                     </DropdownItem>

                                                </DropdownMenu>
                                            </Dropdown>
                                        </NavItem>}
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </div>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header text-md-left text-center">
                            <div className="col-12 col-sm-6">
                                <img alt="logo" src="assets/foodshalanobgfit.png" width="70%" />
                                <h5 style={{ color: "#222021", fontFamily: "Montserrat" }} className="mt-md-3 mt-5">Order food from favourite restaurants near you.</h5>
                            </div>
                            <div className="col-12 col-sm-6 d-md-block d-none">
                                <h1 className="mt-5" style={{ color: "#222021", textAlign: "center", textShadow: "2px 2px #ff0000", fontFamily: "Montserrat" }}>
                                    {this.state.headingtext}
                                </h1>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal} className="login-modal">Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Email</Label>
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    innerRef={input => (this.username = input)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    innerRef={input => (this.password = input)}
                                />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        name="remember"
                                        innerRef={input => (this.remember = input)}
                                    />
                  Remember me
                </Label>
                            </FormGroup>

                            <Button
                                type="submit"
                                value="submit"
                                variant="outlined"
                                className="mt-2"
                                size="large"
                            >
                                <span className="fa fa-sign-in fa-lg"></span>
                            </Button>
                            <FormGroup className="mt-2">
                                <Link to="/reslogin" onClick={this.toggleModal}>
                                    Restaraunt login!<span role="img" aria-label="">&nbsp;🥘</span>
                                </Link>
                                <br />
                                <Link to="/register" onClick={this.toggleModal}>
                                    Not a member? Register here!<span role="img" aria-label="">&nbsp;😋</span>
                                </Link>
                                <br />
                                <Link to="/addrestaraunt" onClick={this.toggleModal} >
                                    Add your Restaraunt and start serving online<span role="img" aria-label="">&nbsp;👨‍🍳</span>
                                </Link>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Header;
