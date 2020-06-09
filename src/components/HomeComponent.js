import React from 'react';
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

function RenderCard(imgsrc) {
    console.log(imgsrc);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: "scale(0.2) translateY(-20%)",
            }}
        >
            <Card className="profile-coursecard">
                <CardHeader
                    avatar={
                        <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            src={imgsrc.imgsrc}
                            alt="promotion"
                        ></Avatar>
                    }
                    title="promotions"
                />
                <CardMedia className={classes.media} image={imgsrc.imgsrc} />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        className="text-center"
                    >
                        Promotion
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <i className="fa fa-heart"></i>
                    </IconButton>
                    <IconButton aria-label="share">
                        <i className="fa fa-share-square"></i>
                    </IconButton>
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
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac quam eget ipsum dapibus sagittis. Sed maximus tellus ac elit gravida maximus eget vitae odio. Integer magna est, tristique vel mi eget, ornare posuere ligula. Sed a nibh tincidunt, tempus lacus vitae, tempor lacus. </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </FadeTransform>)
}

function Home() {


    return (<div className="container">
        <div className="row">
            <div className="col-12">
                <img src="assets/foodshala2.png" alt="foodshala2" style={{ width: "100%" }} />
            </div>
        </div>
        {/* <div className="row">
            <div className="col-12">
                <h2>
                    featured promotions
                </h2>
            </div>
        </div> */}
        <div className="row">
            <div className="col-md-4 col-12 mt-3 mt-md-0">
                <RenderCard imgsrc={"assets/foodshala1.png"} />
            </div>
            <div className="col-md-4 col-12 mt-3 mt-md-0">
                <RenderCard imgsrc={"assets/foodhshala6.jpg"} />
            </div>
            <div className="col-md-4 col-12 mt-3 mt-md-0">
                <RenderCard imgsrc={"assets/foodshala4.jpg"} />
            </div>
        </div>
    </div>)

}

export default Home;