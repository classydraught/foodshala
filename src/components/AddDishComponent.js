import React from 'react';
import { Loading } from "./LoadingComponent";
import { Redirect } from "react-router-dom";
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

function handleSubmit(values, resetDishDetails, addNewDish) {
    let form_data = new FormData();
    if (values.dishImage[0].type === "image/jpeg" || values.dishImage[0].type === "image/png" || values.dishImage[0].type === "image/jpg") {
        form_data.append(
            "dishImage",
            values.dishImage[0],
            values.dishImage.name
        );
        form_data.append("name", values.name);
        form_data.append("price", parseInt(values.price));
        form_data.append("featured", values.featured);
        form_data.append("category", values.category);
        form_data.append("vegan", values.vegan);
        let url = baseUrl + "dishes/createdish";
        axios
            .post(url, form_data, {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer " + localStorage.getItem("foodshalareskey")
                }
            })
            .then(
                response => {
                    if (response.status === 201) {
                        alert("Dish Created");
                        addNewDish(response.data.result);
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
                alert("Dish not created")
            }
            );
        resetDishDetails();
    }
    else {
        alert("Please select only Jpeg/png file only");
    }

}

function AddDish(props) {
    if (props.user.isLoading) {
        return (
            <div className="container" style={{ height: "50vh" }}>
                <div className="row">
                    <div className="col-md-4 col-12">
                    </div>
                    <div className="col-md-4 col-12 mt-5">
                        <Loading />
                    </div>
                    <div className="col-md-4 col-12">
                    </div>
                </div>
            </div>);
    }
    else if (localStorage.getItem("foodshalareskey"))
        return (<div className="container mb-5">
            <div className="row">
                <div className="col-md-4 d-md-block d-none">
                </div>
                <div className="col-12 col-md-4">
                    <div className="my-card register-card">
                        <h2 className="text-center mt-2" style={{ fontFamily: "Montserrat" }}>Add Dish on</h2>
                        <img alt="logo" src="assets/foodshalanobgfitfooter.png" className="img-fluid" />
                        <h4 className="text-center mt-2" style={{ fontFamily: "Montserrat" }}>for serving your best <span style={{ fontFamily: "lobster" }}>&nbsp;food</span></h4>
                        <Divider className="mt-2 mb-3" />
                        <Form
                            model="addDish"
                            onSubmit={values => handleSubmit(values, props.resetDishDetails, props.addNewDish)}
                        >
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text
                                        model=".name"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Dish Name"
                                        validators={{
                                            required,
                                            minLength: minLength(5),
                                            maxLength: maxLength(20)
                                        }}
                                    />
                                    <Errors
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: "Required ",
                                            minLength: "Must be greater than 5 characters ",
                                            maxLength: "Must be 20 characters or less "
                                        }}
                                    />
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text
                                        model=".price"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        placeholder="Price"
                                        validators={{
                                            required,
                                            validphone,
                                        }}
                                    />
                                    <Errors
                                        model=".price"
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
                                    <Control.select model=".category" className="form-control"
                                        id="category"
                                        name="category"
                                        defaultValue="Indian"
                                        placeholder="Category">
                                        <option value="vegan">North Indian</option>
                                        <option value="non-vegan">South Indian</option>
                                        <option value="Chinese">Chinese</option>
                                        <option value="Dessert">Dessert</option>
                                        <option value="Thai">Thai</option>
                                        <option value="Mexican">Mexican</option>
                                        <option value="Mexican">Beverages</option>
                                        <option value="Mexican">Italian</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.checkbox model=".vegan" /><span className="mx-3">Veg</span>
                                    <Control.checkbox model=".featured" /><span className="mx-3">Featured</span>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.file
                                        model=".dishImage"
                                        id="dishImage"
                                        required
                                        className="custom-file"
                                    ></Control.file>

                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{ size: 9, offset: 3 }}>
                                    <Button type="submit" variant="outlined" size="medium">
                                        <i className="fa fa-plus-circle"></i>&nbsp;&nbsp;Add Dish
                  </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div>)
    else {
        return (<div>
            <Redirect to="/home" />
        </div>)
    }
}

export default AddDish;