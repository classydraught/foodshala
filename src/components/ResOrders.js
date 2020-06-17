import React from 'react';
import { Redirect } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { deepOrange, grey } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: deepOrange["A200"],
        color: grey[900],
    },
}));

function RenderCard({ item }) {
    console.log(item.Items);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const obj = {};
    item.Items.map(val =>
        obj[val._id] = typeof (obj[val._id]) === "undefined" ? { name: val.name, items: 1, price: val.price } :
            { name: val.name, items: obj[val._id].items + 1, price: val.price * (obj[val._id].items + 1) }
    )
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: "scale(0.2) translateY(-20%)",
            }}
        >
            <Card className="profile-coursecard mb-3">
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            src={baseUrl + item.Items[0].image}
                            alt="Active orders"
                        ></Avatar>
                    }
                    title={item.userId.name}
                />
                <CardMedia className={classes.media} image={baseUrl + item.Items[0].image} />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className="text-center"
                    >
                        Total Bill  :   {item.cost} Rs /-
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <i className="fa fa-arrow-circle-down"></i>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <CardContent>
                        <dl className="row p-1">
                            <dt className="col-5">Status</dt> <dd className="col-7">{item.status}</dd>

                            <dt className="col-5">Ordered by</dt> <dd className="col-7">{item.userId.name}</dd>

                            <dt className="col-5">Email</dt> <dd className="col-7"> {item.userId.email}</dd>

                            <dt className="col-5">Contact No</dt><dd className="col-7">{item.userId.phone}</dd>
                            <dt className="col-12 my-2">Ordered items</dt>
                            {
                                Object.entries(obj).map(item =>
                                    <> <dt className="col-7">{item[1].name} x {item[1].items} </dt> <dd className="col-5">{item[1].price}</dd></>
                                )
                            }
                        </dl>

                    </CardContent>
                </Collapse>

            </Card>
        </FadeTransform>)
}

function Orders(props) {
    if (props.user.isLoading)
    {
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
    else if (localStorage.getItem("foodshalareskey"))
    {
        if (props.user.LoggedIn)

            return (
                <div className="container my-5">
                    {props.user.UserData.resorders.length !== 0 ? <div className="row">
                        {
                            props.user.UserData.resorders.map(order =>
                                <div className="col-md-4 col-12">
                                    <div >
                                        <RenderCard item={order} />
                                    </div>
                                </div>
                            )
                        }
                    </div> : <div className="row"><div className="col-2"></div><div className="col-8"><img src="https://cdn.dribbble.com/users/721524/screenshots/4112199/no_orders.png" alt="no orders" className="img-fluid" /><div className="col-2"></div></div></div>}
                </div>
            )
        else
        {
            return <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        }
    }
    else
    {
        return <Redirect to="/home" />
    }
}

export default Orders;