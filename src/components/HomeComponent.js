import React from 'react';
import { FadeTransform } from "react-animation-components";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
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

    return (
        <div className="col-md-4 col-12 mt-3 mt-md-0">
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
                                src={item.image}
                                alt="promotion"
                            ></Avatar>
                        }
                        title={item.name}
                    />
                    <CardMedia className={classes.media} image={item.image} />
                </Card>
            </FadeTransform>
        </div>)
}

function Home() {
    const content = [{ name: "Saftey standards", image: "assets/foodshala1.png" }, { name: "Your favourite desserts", image: "assets/foodhshala6.jpg" }, { name: "Wide range of varieties", image: "assets/foodshala4.jpg" }]

    return (<div className="container mb-5">
        <div className="row">
            <div className="col-12">
                <img src="assets/foodshala2.png" alt="foodshala2" style={{ width: "100%" }} />
            </div>
        </div>

        <div className="row">

            {
                content.map(item => <RenderCard item={item} />)
            }

        </div>
    </div >)

}

export default Home;