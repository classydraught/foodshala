import React from "react";
import { CardBody, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Divider from "@material-ui/core/Divider";
import { FadeTransform } from "react-animation-components";
import { Link, Redirect } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },

    avatar: {
        backgroundColor: deepOrange["A200"],
        color: grey[900],
    },
}));

function RenderCard({ item }) {
    const classes = useStyles();


    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: "scale(0.2) translateY(-20%)",
            }}
        >
            <Card className="profile-coursecard my-3">
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            src={baseUrl + item.image}
                            alt="promotion"
                        ></Avatar>
                    }
                    title={item.resname}
                />
                <Link to={`restaraunts/${item._id}`}>
                    <CardMedia className={classes.media} image={baseUrl + item.image} />
                </Link>
            </Card>
        </FadeTransform>)
}



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
                        <h3 className="text-center">My favourites</h3>
                        <Divider className="mb-3" />
                        {props.user.LoggedIn ? <div className="row">
                            {props.user.UserData.favourites.map(item =>
                                <div className="col-md-4 col-12"> <RenderCard item={item} /> </div>
                            )}
                        </div> : <div className="row"><Loading /></div>}
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

