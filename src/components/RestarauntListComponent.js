import React from 'react';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
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
import { lime, grey } from "@material-ui/core/colors";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: lime["A200"],
        color: grey[900]
    }
}));


function RenderRestaraunt({ rest, addTofav, user }) {
    console.log(rest);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const favlist = []
    if (user.LoggedIn && user.UserData.accountType === "User") {
        user.UserData.favourites.map(item => favlist.push(item._id));
        console.log(favlist)
    }
    return (
        <Card className="profile-coursecard mt-1 mb-2 ">
            <Link to={`restaraunts/${rest._id}`}>
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            src={baseUrl + rest.image}
                        ></Avatar>
                    }
                    title={rest.resname}
                />
                <CardMedia className={classes.media} image={baseUrl + rest.image} />
            </Link>
            <CardActions disableSpacing>
                {(user.LoggedIn && user.UserData.accountType === "User") ? <IconButton aria-label="add to favorites">
                    {favlist.includes(rest._id) ? <i className="fa fa-heart" ></i> : <i className="fa fa-heart-o" onClick={() => addTofav(rest._id)}></i>}
                </IconButton> : <span></span>}
                {rest.style === "vegan" ? <span class="badge badge-pill badge-success">100% veg</span> : <span></span>}
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded
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
                    <Typography>{rest.description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}


const RestarauntsList = (props) => {
    const restarnatCatalog = props.restaraunts.restaraunts.map(rest => {
        return (
            <div key={rest._id} className="col-12 col-md-5 m-1">
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: "scale(0.2) translateY(-20%)"
                    }}
                >
                    <RenderRestaraunt rest={rest} addTofav={props.addTofav} user={props.user} />
                </FadeTransform>
            </div>
        );
    });
    if (props.restaraunts.isLoading) {
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
    else if (props.restaraunts.errMess) {
        return (
            <div className="container">
                <div className="row" style={{ height: "50vh" }}>
                    <h4>{props.restaraunts.errMess}</h4>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="container mb-5">
                <div className="row">
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
                        <BreadcrumbItem active>Restaurant's</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Restaurant's near you</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">{restarnatCatalog}</div>
            </div>
        );
    }
};

export default RestarauntsList;

