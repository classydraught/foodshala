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
            console.log(error);
            alert("Wrong Credentials/ Kindly check email or password");
        });
};



// export const alreadyloggedinUser = (email, username, id, image, userorders, accountType, preference, favourites, phone) => ({

//     type: actionTypes.ALREADY_LOGGEDIN,
//     payload: {
//         email: email,
//         username: username,
//         id: id,
//         profilepic: image,
//         userorders: userorders,
//         accountType: accountType,
//         preference: preference,
//         favourites: favourites,
//         phone: phone
//     }

// });