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
                    <button type="button" class="btn btn-outline-dark m-3">Buy</button>
                    <button type="button" class="btn btn-outline-dark"><i class="fa fa-shopping-basket"></i></button>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={item.image}
            />
        </Card>
    );
}


function RenderRest() {
    return (
        <div className="col-12 col-md-5 mr-md-5 mr-0 ">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: "scale(0.2) translateY(-20%)"
                }}
            >
                <div className="card profile-coursecard mb-3">
                    <CardImg top src="assets/rest3.jpg" alt="restaraunt-1" />
                    <CardBody>
                        <CardTitle>Restaraunt 1</CardTitle>

                        <Rating
                            name="read-only"
                            value="4.5"
                            readOnly
                            precision={0.1}
                        />

                        <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus felis enim, in pulvinar arcu maximus eu. Suspendisse laoreet eros eget bibendum auctor. Nam ullamcorper arcu non tellus dignissim sagittis.</CardText>
                    </CardBody>
                </div>
            </FadeTransform>
        </div>
    );
}

const items = [
    { _id: "1", name: "Pizza", image: "assets/food-rest1.jpg" },
    { _id: "2", name: "Burger", image: "assets/food-rest2.jpg" },
    { _id: "3", name: "Biryani", image: "assets/food-rest3.jpg" },
    { _id: "4", name: "Ice cream", image: "assets/food-rest4.jpg" },
    { _id: "5", name: "Noodles", image: "assets/food-rest5.jpg" }
]

const Menu = () => {
    return (<div className="col-12 col-md-5 ">
        <h4>Menu</h4>
        <hr />
        <Stagger in>
            <ul className="list-unstyled">
                <Stagger in>
                    {items.map(item => {
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
                    <BreadcrumbItem active>Restaraunt 1</BreadcrumbItem>{" "}
                </Breadcrumb>
                <div className="col-12 col-6">
                    <h3>Restaraunt 1</h3> <hr />
                </div>
            </div>
            <div className="row">
                <RenderRest />
                <Menu />
            </div>
        </div>
    );
};

export default RestarauntDetail;
