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



class AddRestaraunt extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {
        let form_data = new FormData();
        form_data.append(
            "resImage",
            values.resImage[0],
            values.resImage.name
        );
        form_data.append("resname", values.resname);
        form_data.append("ownername", values.ownername);
        form_data.append("phone", values.phone);
        form_data.append("email", values.email);
        form_data.append("password", values.password);
        form_data.append("style", values.style);
        form_data.append("address", values.address);
        let url = baseUrl + "restaraunt/signup";
        axios
            .post(url, form_data, {
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            .then(
                response => {
                    if (response.status === 201) {
                        alert("Restaraunt created");
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
            .catch(err => {
                alert("Restaraunt not created check email ID or phone")
            }
            );
        this.props.resetRestarauntDetails();
    }
    render() {
        return (<div className="container mb-5">
            <div className="row h-100 justify-content-center align-items-center mt-3">
                <div className="col-md-4 d-md-block d-none">
                    <img alt="register-img-1" src="assets/foodregister6.png" className="img-fluid" />
                </div>
                <div className="col-md-4 col-12">
                    <div className="my-card register-card">
                        <h2 className="text-center mt-2" style={{ fontFamily: "Montserrat" }}>Register to</h2>
                        <img alt="logo" src="assets/foodshalanobgfitfooter.png" className="img-fluid" />
                        <h4 className="text-center mt-2" style={{ fontFamily: "Montserrat" }}>for serving your best <span style={{ fontFamily: "lobster" }}>&nbsp;food</span></h4>
                        <Divider className="mt-2 mb-3" />
                        <Form
                            model="registerres"
                            onSubmit={values => this.handleSubmit(values)}
                        >
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text
                                        model=".resname"
                                        className="form-control"
                                        id="resname"
                                        name="resname"
                                        placeholder="Restaraunt name"
                                        validators={{
                                            required,
                                            minLength: minLength(6),
                                            maxLength: maxLength(16)
                                        }}
                                    />
                                    <Errors
                                        model=".resname"
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
                                        model=".ownername"
                                        className="form-control"
                                        id="ownername"
                                        name="ownername"
                                        placeholder="Owner name"
                                        validators={{
                                            required,
                                            minLength: minLength(6),
                                            maxLength: maxLength(16)
                                        }}
                                    />
                                    <Errors
                                        model=".ownername"
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
                                    <Control.select model=".style" className="form-control"
                                        id="style"
                                        name="style"
                                        placeholder="Style" selected="vegan">
                                        <option value="vegan">Vegan</option>
                                        <option value="non-vegan">Non-vegan</option>
                                        <option value="both">Both</option>

                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text
                                        model=".address"
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        placeholder="Address"
                                        validators={{
                                            required,
                                            minLength: minLength(10),
                                            maxLength: maxLength(150)
                                        }}
                                    />
                                    <Errors
                                        model=".address"
                                        show="touched"
                                        messages={{
                                            required: "Required ",
                                            minLength: "Must be atleast 10 Characters ",
                                            maxLength: "Must be 150 charactesr only ",
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.file
                                        model=".resImage"
                                        id="resImage"
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
                <div className="col-md-4 mt-5 mt-md-0 d-md-block d-none">
                    <img alt="register-img-2" src="assets/registerfood2.gif" className="img-fluid" />
                </div>


            </div>
        </div >
        )
    }
}

export default AddRestaraunt;