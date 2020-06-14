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


function RenderRestaraunt({ rest }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Card className="profile-coursecard mt-1 mb-2 ">
            <Link to={`/restmenu`}>
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
                <IconButton aria-label="add to favorites">
                    <i className="fa fa-heart"></i>
                </IconButton>
                <IconButton aria-label="share">
                    <i className="fa fa-share-square"></i>
                </IconButton>
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
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed risus placerat, commodo nibh nec, molestie turpis. Quisque purus magna, semper sed commodo ac, convallis sit amet felis. In hac habitasse platea dictumst. Vestibulum tempor sagittis erat. Duis aliquam id mi vitae ultrices. Donec sollicitudin, nisl sed vehicula tincidunt, purus nulla elementum ligula</Typography>
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
                    <RenderRestaraunt rest={rest} />
                </FadeTransform>
            </div>
        );
    });
    if (props.restaraunts.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    isLoading
            </div>
            </div>
        );
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

