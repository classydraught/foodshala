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
        })
        .catch(error => {
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
            alert("Wrong Credentials/ Kindly check email or password");
        });
};


export const alreadyLoggedinRes = () => dispatch => {
    dispatch(UserLoading(true));
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
            dispatch(FailedUserLogin())
            alert("Session Experied / please login again");
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

export const fetchRestraunts = () => dispatch => {
    dispatch(RestarauntsLoading(true));

    return fetch(baseUrl + "restaraunt/getallres")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errormsg = new Error(error.message);
                throw errormsg;
            }
        )
        .then(response => response.json())
        .then(restaraunts => dispatch(addRestaraunts(restaraunts.restaraunt)))
        .catch(error => dispatch(RestFailed(error.message)));
};
export const addRestaraunts = restaraunts => ({
    type: actionTypes.ADD_RESTARAUNTS,
    payload: restaraunts
});

export const RestarauntsLoading = () => ({
    type: actionTypes.RESTARAUNTS_LOADING
});

export const RestFailed = errormsg => ({
    type: actionTypes.RESTARAUNTS_FAILED,
    payload: errormsg
});

export const addNewRestaraunt = restaraunt => dispatch => {
    dispatch(addRestaraunttoList(restaraunt));
};
export const addRestaraunttoList = restaraunt => ({
    type: actionTypes.ADD_NEW_RESTARAUNT,
    payload: restaraunt
});


export const fetchDishes = () => dispatch => {
    dispatch(DishesLoading(true));

    return fetch(baseUrl + "dishes/getall")
        .then(
            response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errormsg = new Error(error.message);
                throw errormsg;
            }
        )
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(DishesFailed(error.message)));
};
export const addDishes = dishes => ({
    type: actionTypes.ADD_DISHES,
    payload: dishes
});

export const DishesLoading = () => ({
    type: actionTypes.DISHES_LOADING
});

export const DishesFailed = errormsg => ({
    type: actionTypes.DISHES_FAILED,
    payload: errormsg
});

export const addNewDish = dish => dispatch => {
    dispatch(addNewDishtoList(dish));
};
export const addNewDishtoList = dish => ({
    type: actionTypes.ADD_NEW_DISH,
    payload: dish
});


export const addtoCart = (localCart) => dispatch => {
    dispatch(addDishtoCart(localCart));
};
export const addDishtoCart = (localCart) => ({
    type: actionTypes.ADD_TO_CART,
    payload: localCart
});

export const placeOrder = (dishes) => dispatch => {
    var dishOrdered = [];
    for (const x of dishes) {
        dishOrdered.push(x._id);
    }
    const order = {
        resId: dishes[0].resId,
        Items: dishOrdered,
    }
    return fetch(baseUrl + "orders/createorder", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("foodshalakey")
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.status === 200) {
                alert("Order placed");
                return response.json();
            }
            else {
                alert("Order not placed")
            }
        })
        .then(res => dispatch(addOrdertoUserOrder(res.orderplaced)))
        .catch(err => alert("Order not placed"));
}

export const addOrdertoUserOrder = (order) => ({
    type: actionTypes.ADD_ORDER_USER,
    payload: order
})




