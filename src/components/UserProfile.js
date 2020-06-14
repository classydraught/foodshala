import React from "react";
import { CardBody, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
// import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import { lime, grey } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import { FadeTransform } from "react-animation-components";
import { Link, Redirect } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";

// const useStyles = makeStyles(theme => ({
//     root: {
//         maxWidth: 345
//     },
//     media: {
//         height: 0,
//         paddingTop: "56.25%" // 16:9
//     },
//     expand: {
//         transform: "rotate(0deg)",
//         marginLeft: "auto",
//         transition: theme.transitions.create("transform", {
//             duration: theme.transitions.duration.shortest
//         })
//     },
//     expandOpen: {
//         transform: "rotate(180deg)"
//     },
//     avatar: {
//         backgroundColor: lime["A200"],
//         color: grey[900]
//     }
// }));

// function RenderCourse({ course }) {
//     const classes = useStyles();
//     const [expanded, setExpanded] = React.useState(false);
//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };
//     return (
//         <div className="col-12 col-md-6 mt-2" key={course._id}>
//             <FadeTransform
//                 in
//                 transformProps={{
//                     exitTransform: "scale(0.2) translateY(-20%)"
//                 }}
//             >
//                 <Card className="profile-coursecard">
//                     <CardHeader
//                         avatar={
//                             <Avatar
//                                 aria-label="recipe"
//                                 className={classes.avatar}
//                                 src=""
//                             ></Avatar>
//                         }
//                         title={course.name}
//                     />
//                     <Link to="/home">
//                         <CardMedia
//                             className={classes.media}
//                             image=""
//                         />
//                     </Link>
//                     <CardActions disableSpacing>
//                         <IconButton aria-label="add to favorites">
//                             <i className="fa fa-heart"></i>
//                         </IconButton>
//                         <IconButton aria-label="share">
//                             <i className="fa fa-share-square"></i>
//                         </IconButton>
//                         <IconButton
//                             className={clsx(classes.expand, {
//                                 [classes.expandOpen]: expanded
//                             })}
//                             onClick={handleExpandClick}
//                             aria-expanded={expanded}
//                             aria-label="show more"
//                         >
//                             <i className="fa fa-arrow-circle-down"></i>
//                         </IconButton>
//                     </CardActions>
//                     <Collapse in={expanded} timeout="auto" unmountOnExit>
//                         <CardContent>
//                             <Typography>{course.description}</Typography>
//                         </CardContent>
//                     </Collapse>
//                 </Card>
//             </FadeTransform>
//         </div>
//     );
// }
function Profile(props) {
    if (props.user.isLoading) {
        return (<div>
            is Loading
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
