import React from "react";
import { CardBody, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Divider from "@material-ui/core/Divider";
import { FadeTransform } from "react-animation-components";
import { Link, Redirect } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";



function Profile(props) {
    if (props.user.isLoading) {
        return (<div className="container" style={{ height: "50vh" }}>
            <div className="row">
                <div className="col-md-4 col-12">
                </div>
                <div className="col-md-4 col-12 mt-5">
                    <Loading />
                </div>
                <div className="col-md-4 col-12">
                </div>
            </div>
        </div>)
    }
    else if (localStorage.getItem("foodshalakey")) {
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link
                            to="/home"
                            style={{
                                color: "#0b0704"
                            }}
                        >
                            Home
                   </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Profile</BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: "scale(0.2) translateY(-20%)"
                            }}
                        >
                            <div className="card my-3 profilecard">
                                <CardImg
                                    src={baseUrl + props.user.UserData.profilepic}
                                    className="image--cover mx-auto"
                                />
                                <h3>{props.user.UserData.username}</h3>
                                <CardBody>
                                    <Divider />
                                    <p className="text-center mt-3">
                                        <span role="img" aria-label="victory">
                                            &nbsp;😋
                    </span>
                    foodie
                  </p>
                                    <div className="mt-3 text-center">
                                        <i className="fa fa-2x fa-facebook m-2"></i>
                                        <i className="fa fa-2x fa-instagram m-2"></i>
                                        <i className="fa fa-2x fa-twitter m-2"></i>
                                    </div>
                                </CardBody>
                            </div>
                        </FadeTransform>
                    </div>
                    <div className="col-12 col-md-8 my-3 ">
                        <h3 className="text-center">My favorites</h3>
                        <Divider className="mb-3" />
                        <div className="row">

                        </div>
                    </div>
                </div>
            </div>

        );
    }
    else {
        return <Redirect to="/home" />
    }

}

export default Profile;
