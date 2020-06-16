import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import {

    Row,
    Col,
    Button
} from 'reactstrap';
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
import { Control, Form, Errors } from "react-redux-form";


const required = value => value && value.length;
const validphone = value => /^\d+$/.test(value);
const maxLength = length => value => !value || value.length <= length;
const minLength = length => value => value && value.length >= length;
const validEmail = value =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value);


class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        let form_data = new FormData();

        if (values.profileImage[0].type === "image/jpeg" || values.profileImage[0].type === "image/png" || values.profileImage[0].type === "image/jpg") {
            form_data.append(
                "profileImage",
                values.profileImage[0],
                values.profileImage.name
            );

            form_data.append("name", values.username);
            form_data.append("email", values.email);
            form_data.append("password", values.password);
            form_data.append("phone", parseInt(values.phone));
            form_data.append("preference", values.preference);
            let url = baseUrl + "user/signup";
            axios
                .post(url, form_data, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                })
                .then(
                    response => {
                        if (response.status === 201) {
                            alert("User created");
                        } else {
                            var error = new Error(
                                "Error " + response.status + ": " + response.statusText
                            );
                            error.response = response;
                            throw error;
                        }
                    },
                    error => {
                        throw error;
                    }
                )
                .catch(err => alert("User not created check email ID or phone" + err));
            this.props.resetUserDetails();
        }
        else {
            alert("Please select JPEG/PNG file only");
        }
    }
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
                        <Divider className="mt-2 mb-3" />
                        <Form
                            model="registeruser"
                            onSubmit={values => this.handleSubmit(values)}
                        >
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text
                                        model=".username"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder="User name"
                                        validators={{
                                            required,
                                            minLength: minLength(6),
                                            maxLength: maxLength(16)
                                        }}
                                    />
                                    <Errors
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: "Required ",
                                            minLength: "Must be greater than 6 characters ",
                                            maxLength: "Must be 16 characters or less "
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text
                                        model=".email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Email address"
                                        validators={{ required, validEmail }}
                                    />
                                    <Errors
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: "Required ",
                                            validEmail: "Invalid email address "
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.password
                                        model=".password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        validators={{
                                            required,
                                            minLength: minLength(8),
                                            maxLength: maxLength(16)
                                        }}
                                    />
                                    <Errors
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: "Required ",
                                            minLength: "Must be greater than 8 characters ",
                                            maxLength: "Must be 16 characters or less "
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text
                                        model=".phone"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        placeholder="Mobile"
                                        validators={{
                                            required,
                                            validphone,
                                            minLength: minLength(10),
                                            maxLength: maxLength(10)
                                        }}
                                    />
                                    <Errors
                                        model=".phone"
                                        show="touched"
                                        messages={{
                                            required: "Required ",
                                            minLength: "Must be 10 digits only ",
                                            maxLength: "Must be 10 digits only ",
                                            validphone: "Should be only numbers"
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.select model=".preference" className="form-control"
                                        id="preference"
                                        name="preference"
                                        placeholder="Preference" selected="vegan">
                                        <option value="vegan">Vegan</option>
                                        <option value="non-vegan">Non-vegan</option>
                                        <option value="both">Both</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.file
                                        model=".profileImage"
                                        id="profileImage"
                                        required
                                        className="custom-file"
                                    ></Control.file>

                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{ size: 9, offset: 3 }}>
                                    <Button type="submit" variant="outlined" size="medium">
                                        <i className="fa fa-user-plus"></i>&nbsp;&nbsp;Register
                  </Button>
                                </Col>
                            </Row>
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