import React from "react";
import {
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { FadeTransform, Stagger, Fade } from "react-animation-components";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
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
                    <button type="button" className="btn btn-outline-dark m-3">Buy</button>
                    <button type="button" className="btn btn-outline-dark"><i className="fa fa-shopping-basket"></i></button>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={baseUrl + item.image}
            />
        </Card>
    );
}


function RenderRest({ restaraunt }) {
    return (
        <div className="col-12 col-md-5 mr-md-5 mr-0 ">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: "scale(0.2) translateY(-20%)"
                }}
            >
                <div className="card profile-coursecard mb-3">
                    <CardImg top src={baseUrl + restaraunt.image} alt={restaraunt.resname} />
                    <CardBody>
                        <CardTitle>{restaraunt.resname}</CardTitle>

                        <Rating
                            name="read-only"
                            value="4.5"
                            readOnly
                            precision={0.1}
                        />

                        <CardText>{restaraunt.description}</CardText>
                    </CardBody>
                </div>
            </FadeTransform>
        </div>
    );
}


const Menu = ({ dishes }) => {
    return (<div className="col-12 col-md-5 ">
        <h4>Menu</h4>
        <hr />
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

const RestarauntDetail = props => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
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
                        <BreadcrumbItem>
                            <Link
                                to="/restaraunts"
                                style={{
                                    color: "#0b0704"
                                }}
                            >
                                Restaraunt's
                </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.restaraunt.resname}</BreadcrumbItem>{" "}
                    </Breadcrumb>
                    <div className="col-12 col-6">
                        <h3>{props.restaraunt.resname}</h3> <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderRest restaraunt={props.restaraunt} />
                    <Menu dishes={props.dishes} />
                </div>
            </div>
        );
    }
};

export default RestarauntDetail;
