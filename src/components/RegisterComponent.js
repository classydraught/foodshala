import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import {
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';

class RegisterUser extends Component {
    render() {
        return (<div className="container mb-5">
            <div className="row h-100 justify-content-center align-items-center mt-3">
                <div className="col-md-4 d-md-block d-none">
                    <img alt="register-img-1" src="assets/registerfood1.jpg" className="img-fluid" />
                </div>
                <div className="col-md-4 col-12">
                    <div className="my-card register-card">
                        <h2 className="text-center mt-2" style={{ fontFamily: "Montserrat" }}>Register to</h2>
                        <img alt="logo" src="assets/foodshalanobgfitfooter.png" className="img-fluid" />
                        <h4 className="text-center mt-2" style={{ fontFamily: "Montserrat" }}>for having <span style={{ fontFamily: "lobster" }}>&nbsp;foodgasm</span></h4>
                        <Divider className="mt-2" />
                        <Form onSubmit={this.handleLogin} className="mt-3">
                            <FormGroup>
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    innerRef={input => (this.username = input)}
                                />
                            </FormGroup>


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
                            <FormGroup>
                                <Input
                                    type="password"
                                    id="cpassword"
                                    name="cpassword"
                                    placeholder="Confirm password"
                                    innerRef={input => (this.cpassword = input)}
                                />
                            </FormGroup>
                            <div className="input-group mt-3">
                                <div className="input-group-prepend ">
                                    <label className="input-group-text" for="inputGroupSelect01">Preference</label>
                                </div>
                                <select className="custom-select" id="inputGroupSelect01">
                                    <option selected>Vegan</option>
                                    <option value="1">Non-vegan</option>
                                    <option value="2">Both</option>
                                </select>
                            </div>
                            <div className="custom-file mt-3">
                                <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                <label class="custom-file-label" for="inputGroupFile01">Profile picture</label>

                            </div>
                            <div className="text-center">

                                <Button
                                    type="submit"
                                    value="submit"
                                    variant="outlined"
                                    className="mt-3"
                                    size="large"
                                >
                                    <span className="fa fa-sign-in fa-lg"></span>&nbsp;Register
                            </Button>
                            </div>

                        </Form>
                    </div>

                </div>
                <div className="col-md-4 d-md-block d-none">
                    <img alt="register-img-2" src="assets/quickdelivery.png" className="img-fluid" />
                </div>


            </div>
        </div >
        )
    }
}

export default RegisterUser;