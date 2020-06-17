import React from "react";
import { Link, Redirect } from "react-router-dom";
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
            <Card className="profile-coursecard my-3">
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            src={baseUrl + item.resId.image}
                            alt="promotion"
                        ></Avatar>
                    }
                    title={item.resId.resname}
                />
                <Link to={`restaraunts/${item.resId._id}`}>
                    <CardMedia className={classes.media} image={baseUrl + item.resId.image} />
                </Link>
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className="text-center"
                    >
                        Total bill :  {item.cost} Rs /-
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
                            {Object.entries(obj).map(item =>
                                <><dt className="col-8">{item[1].name} x {item[1].items}</dt> <dd className="col-4">{item[1].price}</dd></>
                            )}
                        </dl>
                    </CardContent>
                </Collapse>

            </Card>
        </FadeTransform>)
}

function UserOrders(props) {
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
        if (props.user.LoggedIn)

            return (
                <div className="container my-5">
                    {props.user.UserData.userorders.length !== 0 ? <div className="row">
                        {
                            props.user.UserData.userorders.map(order =>
                                <div className="col-md-3 col-12">
                                    <div >
                                        <RenderCard item={order} />
                                    </div>
                                </div>
                            )

                        }
                    </div> : <div className="row"><div className="col-2"></div><div className="col-8"><img src="https://cdn.dribbble.com/users/357929/screenshots/2276751/orderup-emptystate-sadbag.png" alt="no orders" className="img-fluid" /><div className="col-2"></div></div></div>}
                </div>
            )
        else {
            return <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        }
    }
    else {
        return <Redirect to="/home" />
    }

}

export default UserOrders;