import React, { useState } from "react";
import {
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Breadcrumb,
    BreadcrumbItem,
    Modal,
    ModalBody,
    ModalHeader,
    Button,
    Label,
    Row
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { FadeTransform, Stagger, Fade } from "react-animation-components";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Loading, OrderLoading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { useAlert } from 'react-alert';
import { Prompt } from 'react-router';
import { LocalForm, Control, Errors } from "react-redux-form";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
const required = value => value && value.length;
const maxLength = length => value => !value || value.length <= length;
const minLength = length => value => value && value.length >= length;




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

function RenderRest({ restaraunt, addReview, reviews, reviewerrMess, reviewsLoading }) {
    var [userrating, setUserRating] = useState(0);
    var [isReviewOpen, toggleReviewModal] = useState(false);
    let totalRating = 0;
    if (reviews.length !== 0)
        for (const x of reviews) totalRating += x.value
    totalRating = totalRating / reviews.length;
    function handleComment(values) {
        toggleReviewModal(!isReviewOpen);
        addReview(userrating, values.comment, restaraunt._id);
        setUserRating(userrating = 0);
    }
    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        setUserRating(userrating = value);
        console.log(userrating);
    }
    return (
        <div className="col-12 col-md-5 mr-md-5 mr-0 ">
            <Modal isOpen={isReviewOpen} toggle={() => toggleReviewModal(!isReviewOpen)} >
                <ModalBody>
                    <div className="container h-100">
                        <div className="row d-block text-center">
                            <h3 className="mt-5" style={{ fontFamily: "Montserrat" }}>Add Review</h3>
                            <div className="col-12 mt-5" >
                                <LocalForm className="container d-block" onSubmit={(values) => handleComment(values)} >
                                    <Row className="form-group">
                                        <Label htmlFor="userrating">Rating : </Label>
                                        <Rating
                                            className="ml-3"
                                            name="customized-empty"
                                            defaultValue={userrating}
                                            onChange={(event) => handleInputChange(event)}
                                        />
                                    </Row>

                                    <Row className="form-group">
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea
                                            rows={3}
                                            model=".comment"
                                            className="form-control"
                                            id="comment"
                                            name="comment"
                                            placeholder="Your comment"
                                            validators={{
                                                required,
                                                minLength: minLength(4),
                                                maxLength: maxLength(70)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".comment"
                                            show="touched"
                                            messages={{
                                                required: "Required ",
                                                minLength: "Must be greater than 4 characters "
                                            }}
                                        />
                                    </Row>
                                    <Row>
                                        <Button type="submit" variant="outlined" size="large">
                                            <i className="fa fa-paper-plane">&nbsp;&nbsp;Post</i>
                                        </Button>
                                        <Button className="ml-5" onClick={() => toggleReviewModal(!isReviewOpen)}><CancelScheduleSendIcon />&nbsp;&nbsp;Cancel</Button>
                                    </Row>

                                </LocalForm>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
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
                            value={totalRating}
                            readOnly
                            precision={0.1}
                        />
                        <CardText>{restaraunt.description}</CardText>
                    </CardBody>
                </div>
            </FadeTransform>
            <Button variant="outlined" onClick={() => toggleReviewModal(!isReviewOpen)} size="small" outline className="mb-5">
                <RateReviewIcon />
              &nbsp;&nbsp;Add review
              </Button>

        </div>
    );
}

const Menu = ({ dishes, user, addtoCart, resID, placeOrder }) => {
    const alert = useAlert();
    var [usrdishes, addDishlocal] = useState([]);
    function ItemCard({ item, user }) {
        const classes = useStyles();
        return (
            <>
                <Prompt message='You have some items in the cart. Moving out will discard items the cart.' when={usrdishes.length !== 0} />
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h6" variant="h6" style={{ fontFamily: "Montserrat" }}>
                                {item.name}
                            </Typography>
                            {item.featured ? <span class="badge badge-pill badge-warning mr-3">Must try</span> : <span></span>}{item.vegan ? <span class="badge badge-pill badge-success">100% veg</span> : <span></span>}
                        </CardContent>
                        <div>
                            <p className="ml-3 p-0 mb-0">{item.price} /-</p>
                            {(user.LoggedIn && user.UserData.accountType === "User") ? <button type="button" className="btn btn-outline-dark m-3 mt-0" onClick={() => { addDishlocal(usrdishes.concat(item)); toggleModal(!isModalOpen) }}>Buy</button> : <button type="button" className="btn btn-outline-dark m-3 mt-0" onClick={() => { alert.show('Login as user to purchase') }}>Buy</button>}
                            {(user.LoggedIn && user.UserData.accountType === "User") ? <button type="button" className="btn btn-outline-dark" onClick={() => { addDishlocal(usrdishes.concat(item)); alert.success('Added to cart') }}><i className="fa fa-shopping-basket"></i></button> : <button type="button" className="btn btn-outline-dark" onClick={() => { alert.show('Login as user to add to cart') }}><i className="fa fa-shopping-basket"></i></button>}
                        </div>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={baseUrl + item.image}
                    />
                </Card>
            </>
        );
    }
    var [isModalOpen, toggleModal] = useState(false);
    var [isPurModalOpen, togglePurModal] = useState(false);
    var total = 0;
    const obj = {};
    usrdishes.map(val => {
        total += val.price;
        obj[val._id] = typeof (obj[val._id]) === "undefined" ? { name: val.name, items: 1, price: val.price } :
            { name: val.name, items: obj[val._id].items + 1, price: val.price * (obj[val._id].items + 1) }
        return total;
    }
    );
    return (<div className="col-12 col-md-5 ">

        <Modal isOpen={isPurModalOpen} toggle={() => togglePurModal(!isPurModalOpen)} >
            <ModalBody>
                <div className="container h-100">
                    <div className="row d-block text-center">
                        <h3 className="mt-5" style={{ fontFamily: "Montserrat" }}>order being placed</h3>
                        <div className="col-12" style={{ marginLeft: "35%", marginTop: "20%", marginBottom: "30%" }}>
                            <OrderLoading />
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
        <Modal isOpen={isModalOpen} toggle={() => toggleModal(!isModalOpen)} >
            <ModalHeader toggle={() => toggleModal(!isModalOpen)} className="login-modal">Place Order</ModalHeader>
            <ModalBody>
                {usrdishes.length === 0 ? <div><img src="https://cdn.dribbble.com/users/1085743/screenshots/4005051/1.png" className="img-fluid" alt="empty cart" /></div> : <div className="">
                    <h4>Cart value</h4>
                    <dl className="row p-1">
                        {
                            Object.entries(obj).map(item =>
                                <>  <dt className="col-6">{item[1].name} x {item[1].items} </dt> <dd className="col-6">{item[1].price}</dd></>
                            )
                        }
                        <dt className="col-6">Total bill : </dt> <dd className="col-6">{total}</dd>
                    </dl>
                    <br />
                    <button className="btn btn-dark m-md-5 mt-3 mr-3" onClick={() => { placeOrder(usrdishes); toggleModal(!isModalOpen); togglePurModal(!isPurModalOpen); addDishlocal((usrdishes = [])) }}>Place order</button>
                    <button className="btn btn-dark m-md-5 mt-3" onClick={() => addDishlocal((usrdishes = []))}>Clear cart</button>
                </div>
                }
            </ModalBody>
        </Modal>
        <h4>Menu</h4>
        {(user.LoggedIn && user.UserData.accountType === "User") ? (<><button className="btn btn-outline-dark mt-2 mr-5" onClick={() => toggleModal(!isModalOpen)}>Confrim Order</button>  <span className="fa fa-shopping-cart fa-lg ml-5"></span><span className="badge badge-dark ml-3">{usrdishes.length}</span></>) : <span></span>}
        <hr />
        <Stagger in>
            <ul className="list-unstyled">
                <Stagger in>
                    {dishes.map(item => {
                        return (
                            <Fade in key={item._id}>
                                <li className="mb-3" style={{ maxHeight: "10%" }}>
                                    <ItemCard item={item} user={user} addtoCart={addtoCart} resID={resID} />
                                </li>
                            </Fade>
                        );
                    })}
                </Stagger>
            </ul>
        </Stagger>
    </div >)

}

const RestarauntDetail = props => {
    if (props.isLoading)
    {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess)
    {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else
    {
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
                    <RenderRest restaraunt={props.restaraunt} addReview={props.addReview} reviews={props.reviews} reviewerrMess={props.reviewerrMess}
                        reviewsLoading={props.reviewsLoading} />
                    <Menu dishes={props.dishes} user={props.user} addtoCart={props.addtoCart} resID={props.restaraunt._id} placeOrder={props.placeOrder} />
                </div>
            </div>
        );
    }
};

export default RestarauntDetail;
