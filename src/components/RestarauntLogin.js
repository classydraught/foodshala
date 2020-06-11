import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import {
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';

class RestarauntLogin extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "#f56c3a" }}>
                <div className="container">
                    <div className="row h-100 justify-content-center align-items-center pt-5 pb-5">
                        <div className="col-md-4 d-md-block d-none">
                            <img alt="register-img-1" src="assets/foodpizza.gif" className="img-fluid" />
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="login-card">
                                <h2 className="text-center mt-2" style={{ fontFamily: "Montserrat" }}>Login to</h2>
                                <img alt="logo" src="assets/foodshalanobgfit.png" className="img-fluid" />
                                <h4 className="text-center mt-2" style={{ fontFamily: "Montserrat" }}>for serving your best <span style={{ fontFamily: "lobster" }}>&nbsp;food</span></h4>
                                <Divider className="mt-2" />
                                <Form onSubmit={this.handleLogin} className="mt-3">

                                    <FormGroup>
                                        <Input
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            innerRef={input => (this.email = input)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            innerRef={input => (this.password = input)}
                                        />
                                    </FormGroup>
                                    <div className="text-center">
                                        <Button
                                            type="submit"
                                            value="submit"
                                            variant="outlined"
                                            className="mt-3"
                                            size="large"
                                        >
                                            <span className="fa fa-sign-in fa-lg"></span>&nbsp;Login
                            </Button>
                                    </div>
                                </Form>
                            </div>

                        </div>
                        <div className="col-md-4 d-md-block d-none">
                            <img alt="register-img-2" src="assets/foodpizza.gif" className="img-fluid" />
                        </div>
                    </div>
                </div >
            </div>
        )
    }
}

export default RestarauntLogin;