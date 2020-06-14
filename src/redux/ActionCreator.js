import * as actionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const loginUser = (email, password) => dispatch => {
    const loginUser = {
        email: email,
        password: password
    };
    return fetch(baseUrl + "user/login", {
        method: "POST",
        body: JSON.stringify(loginUser),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("foodshalakey", response.token);
            dispatch(
                loggedinUser(
                    response.email,
                    response.name,
                    response.id,
                    response.image,
                    response.orders,
                    response.accountType,
                    response.favourites,
                    response.preference,
                    response.phone
                )
            );
            window.location = "/userprofile";
        })
        .catch(error => {
            console.log(error);
            alert("Wrong Credentials/ Kindly check email or password");
        });
};

export const loggedinUser = (email, username, id, image, userorders, accountType, preference, favourites, phone) => ({

    type: actionTypes.LOGIN_USER,
    payload: {
        email: email,
        username: username,
        id: id,
        profilepic: image,
        userorders: userorders,
        accountType: accountType,
        preference: preference,
        favourites: favourites,
        phone: phone
    }

});

export const LogOutUser = () => dispatch => {
    dispatch(loggedOutUser());
};
export const loggedOutUser = () => ({
    type: actionTypes.LOGOUT_USER,
    payload: {}
});

export const alreadyLoggedin = () => dispatch => {
    dispatch(UserLoading(true));
    return fetch(baseUrl + "user/getuserdata", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("foodshalakey")
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error(
                    "Error " + response.status + ": " + response.statusText
                );
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            }
        ).then(response => response.json())
        .then(response => {
            dispatch(
                loggedinUser(
                    response.email,
                    response.name,
                    response.id,
                    response.image,
                    response.orders,
                    response.accountType,
                    response.favourites,
                    response.preference,
                    response.phone
                )
            );
        })
        .catch(error => {
            dispatch(FailedUserLogin())
            alert("Session Experied / please login again");
        });
};

export const UserLoading = () => ({
    type: actionTypes.USER_LOADING
});

export const FailedUserLogin = () => ({
    type: actionTypes.FAILED_USERLOGIN
})


export const resLogin = (email, password) => dispatch => {
    const loginUser = {
        email: email,
        password: password
    };
    console.log(loginUser);
    return fetch(baseUrl + "restaraunt/login", {
        method: "POST",
        body: JSON.stringify(loginUser),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw error;
            }
        )
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("foodshalareskey", response.token);
            dispatch(
                resLoggedin(
                    response.email,
                    response.resname,
                    response.ownername,
                    response.id,
                    response.image,
                    response.resorders,
                    response.accountType,
                    response.dishes,
                    response.style,
                    response.phone,
                    response.address
                )
            );
            window.location = "/resprofile";
        })
        .catch(error => {
            console.log(error);
            alert("Wrong Credentials/ Kindly check email or password");
        });
};


export const alreadyLoggedinRes = () => dispatch => {
    return fetch(baseUrl + "restaraunt/getresdata", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("foodshalareskey")
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error(
                    "Error " + response.status + ": " + response.statusText
                );
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            }
        ).then(response => response.json())
        .then(response => {
            dispatch(
                resLoggedin(
                    response.email,
                    response.resname,
                    response.ownername,
                    response.id,
                    response.image,
                    response.resorders,
                    response.accountType,
                    response.dishes,
                    response.style,
                    response.phone,
                    response.address
                )
            );
        })
        .catch(error => {
            console.log(error);
            alert("Session experied / Please login again");
        });
};

export const resLoggedin = (email, resname, ownername, id, image, resorders, accountType, dishes, style, phone, address) => ({
    type: actionTypes.LOGIN_USER,
    payload: {
        email: email,
        resname: resname,
        ownername: ownername,
        dishes: dishes,
        id: id,
        respic: image,
        resorders: resorders,
        accountType: accountType,
        style: style,
        orders: resorders,
        phone: phone,
        address: address
    }
})


