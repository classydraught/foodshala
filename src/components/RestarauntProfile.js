import React from "react";
import { CardBody, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { FadeTransform, Stagger, Fade } from "react-animation-components";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Link, Redirect } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";


const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: "30%",
        marginLeft: "auto"
    },
}));

const Menu = ({ LoggedIn, dishes }) => {
    if (!LoggedIn)
        return (<h1>

        </h1>)
    else
        return (<div className="col-12">
            <Stagger in>
                <ul className="list-unstyled">
                    <Stagger in>
                        {dishes.map(item => {
                            return (
                                <Fade in key={item._id}>
                                    <li className="mb-3" style={{ maxHeight: "10%" }}>
                                        <ItemCard item={item} />
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>
            </Stagger>

        </div>)

}



function ItemCard({ item }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {item.name}
                    </Typography>
                </CardContent>
                <div>
                    <h6 className="ml-3">{item.price} /-</h6>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={baseUrl + item.image}
            />
        </Card>
    );
}
function RestarauntProfile(props) {
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
    else if (localStorage.getItem("foodshalareskey")) {
        var disheslength, ordersLength;
        if (props.user.LoggedIn) {
            disheslength = props.user.UserData.dishes.length;
            ordersLength = props.user.UserData.resorders.length;
        }
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
                    <BreadcrumbItem active>Restaraunt Profile</BreadcrumbItem>
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
                                    src={baseUrl + props.user.UserData.respic}
                                    className="image--cover mx-auto"
                                />
                                <h3>{props.user.UserData.resname}</h3>
                                <CardBody>
                                    <Divider />
                                    <h6 className="text-center mt-2">Number of dishes : {disheslength}</h6>
                                    <h6 className="text-center mt-2">Active orders : {ordersLength}</h6>

                                    <p className="text-center mt-2">
                                        <span role="img" aria-label="victory">
                                            serving the best
                                   </span>

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
                        <h3 className="text-center">Menu</h3>
                        <Divider className="mb-3" />
                        <div className="row">
                            <Menu dishes={props.user.UserData.dishes} LoggedIn={props.user.LoggedIn} />
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

export default RestarauntProfile;
