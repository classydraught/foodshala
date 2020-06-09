import React from "react";
import { Link } from "react-router-dom";
function Footer(props) {
    return (
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link
                                    to="/home"
                                    style={{
                                        color: "#eee"
                                    }}
                                >
                                    Home
                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/aboutus"
                                    style={{
                                        color: "#eee"
                                    }}
                                >
                                    Menu
                             </Link>
                            </li>
                            <li>
                                <Link
                                    to="/courses"
                                    style={{
                                        color: "#eee"
                                    }}
                                >
                                    About us
                            </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contactus"
                                    style={{
                                        color: "#eee"
                                    }}
                                >
                                    Contact Us
                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5 style={{ color: "#eee" }}>Our Address</h5>
                        <address style={{ color: "#eee" }}>
                            Mohan Elite Apartment ,Plot 51
              <br />
              Kothaguda
              <br />
              Hyderabad, India
              <br />
                            <i className="fa fa-phone fa-lg"></i>: +91 7673979429
              <br />
                            <i className="fa fa-fax fa-lg"></i>: +91 8297972202
              <br />
                            <i className="fa fa-envelope fa-lg"></i>:{" "}
                            <a
                                href="mailto:cskavi34@gmail.com"
                                style={{ color: "#eee" }}
                            >
                                cskavi34@gmail.com
              </a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center mt-3 mt-md-0">
                        <div className="text-center">
                            <i className="fa fa-twitter fa-lg mx-3"></i>
                            <i className="fa fa-facebook fa-lg mx-3"></i>
                            <i className="fa fa-google-plus-square fa-lg mx-3"></i>
                            <i className="fa fa-pinterest fa-lg mx-3"></i>
                        </div>
                    </div>
                </div>
                <hr style={{ backgroundColor: "#eee" }} />
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <img alt="logo" src="assets/foodshalanobgfitfooter.png" className="img-fluid" style={{ width: "20%", float: "right" }}></img>
                    </div>
                    <div><p className="text-center">© 2020 foodshala</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
