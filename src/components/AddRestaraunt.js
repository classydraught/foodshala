import React, { Component } from 'react';
import { Divider } from '@material-ui/core';
import {
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';

class AddRestaraunt extends Component {
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
                        <Divider className="mt-2" />
                        <Form onSubmit={this.handleLogin} className="mt-3">
                            <FormGroup>
                                <Input
                                    type="text"
                                    id="rname"
                                    name="rname"
                                    placeholder="Restaraunt Name"
                                    innerRef={input => (this.rname = input)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    id="oname"
                                    name="oname"
                                    placeholder="Owner name"
                                    innerRef={input => (this.oname = input)}
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
                                    <label className="input-group-text" for="irstyle">Restaraunt style</label>
                                </div>
                                <select className="custom-select" id="rstyle">
                                    <option selected>Vegan</option>
                                    <option value="1">Non-vegan</option>
                                    <option value="2">Both</option>
                                </select>
                            </div>
                            <div className="custom-file mt-3">
                                <input type="file" className="custom-file-input" id="respic" name="respic" />
                                <label class="custom-file-label" for="respic">Restaraunt picture</label>

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
                <div className="col-md-4 mt-5 mt-md-0 d-md-block d-none">
                    <img alt="register-img-2" src="assets/registerfood2.gif" className="img-fluid" />
                </div>


            </div>
        </div >
        )
    }
}

export default AddRestaraunt;