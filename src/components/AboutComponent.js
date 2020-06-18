import React from "react";
import { Link } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,

} from "reactstrap";

function About(props) {

    return (
        <div className="container mb-5">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link
                            to="/home"
                            style={{
                                color: "#0b0704",
                            }}
                        >
                            Home
              </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>About</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p className="text-justify">
                        Begun in 2020, foodshala immediately settled itself
                        as a culinary symbol second to none in India. With its one of a kind
                        brand of world combination cooking that can be discovered no place else, it
                        appreciates support from the A-rundown customer base in India. Highlighting
                        best restaraunt's from your city, you never
                        realize what will show up on your plate whenever you request from us.
            </p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="text-white" style={{backgroundColor:"#ff5722"}}>
                            Facts At a Glance
              </CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2020</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">Internshala</dd>
                                <dt className="col-6">Orders served till now</dt>
                                <dd className="col-6">10 million</dd>
                                <dt className="col-6">Total customers</dt>
                                <dd className="col-6">3 million</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 mt-3">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">
                                    " Pull up a chair. Take a taste. Come join us. Life is so endlessly
                    <strong> delicious.</strong> “
                  </p>
                                <footer className="blockquote-footer">
                                    Ruth Reichl
                   
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}


export default About;
