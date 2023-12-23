import api from "../utility";
export const loginHandler = (email, password) => {
    return function (dispatch) {
        if (email.trim() === '' || password.trim() === '') {
            dispatch({
                type: 'LOGIN_ERROR',
            });
        } else {
            api.post('auth/login', {
                email: email,
                password: password
            }).then((res) => {
                localStorage.setItem('login', res.data.data.token);
                localStorage.setItem('user',JSON.stringify(res.data.data.user));
                api.get('cart/getAllCustomerProductCart').then(cartRes => {
                    localStorage.setItem('cart',JSON.stringify(cartRes.data.data));
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        token: res.data.data.token,
                        user: {...res.data.data.user},
                    });
                }).catch(err => {
                    dispatch({
                        type: 'LOGIN_ERROR'
                    })
                })
            }).catch(err => {
                if (err.message === 'Request failed with status code 401') {
                    window.alert("Email And Password Does Not Match");
                    dispatch({
                        type: 'LOGIN_ERROR',
                    })
                } else {
                    window.alert("There is Some Network Error");
                    dispatch({
                        type: 'LOGIN_ERROR',
                    })
                }
            });
        }
    }
}

export const cartGetterHandler = () => {
    return function(dispatch) {
        api.get('cart/getAllCustomerProductCart').then(res => {
            dispatch({
                type: 'GET_CART_SUCCESS',
                cart: res.data.data
            });
        }).catch(err => {
            dispatch({
                type: 'GET_CART_FAIL',
                cart: {}
            })
        })
    }
}

export const addToCart = (quantity,pname,productpic,id,price) => {
    return function(dispatch) {
        api.post(`cart/addToCart/${id}`,{
            quantity: quantity,
            pname: pname,
            productPic: productpic,
            price: price
        }).then(res => {
            let cartProducts = localStorage.getItem('cart');
            cartProducts = (cartProducts === []) ? [JSON.parse(res.data.data)] : [...cartProducts,JSON.parse(res.data.data)];
            localStorage.setItem('cart',cartProducts);
            dispatch({
                type : 'ADD_TO_CART_SUCCESS',
                data : res.data.data
            });
        }).catch(err => {
            dispatch({
                type : 'ADD_TO_CART_FAILED',
                data : {}
            });
        })
    }
}

export const deleteProductFromCart = (pid) => {
    return function(dispatch) {
        api.delete(`cart/deleteProductFromCart/${pid}`).then(res => {
            dispatch({
                type: 'DELETE_PRODUCT_CART_SUCCESS'
            });
        }).catch(err => {
            dispatch({
                type: 'DELETE_PRODUCT_CART_FAILED'
            })
        });
    }
}
export const quantityDecrease = (pid,quan) => {
    return function(dispatch) {
        api.patch(`cart/updateCart/${pid}`,{
            quantity: quan - 1
        }).then(res => {
            dispatch({
                type: 'QUANTITY_DECREASE_SUCCESS',
                pid: pid
            })
        }).catch(err => {
            dispatch({
                type : 'QUANTITY_DECREASE_FAILED'
            })
        })
    }
}

export const quantityIncrease = (pid,quan) => {
    return function(dispatch) {
        api.patch(`cart/updateCart/${pid}`,{
            quantity: quan + 1
        }).then(res => {

            dispatch({
                type: 'QUANTITY_INCREASE_SUCCESS',
                pid: pid
            });
        }).catch(err => {
            dispatch({
                type : 'QUANTITY_INCREASE_FAILED'
            })
        })
    }
}

export const logoutHandler = () => {
    localStorage.clear();
    return {
        type: 'LOG_OUT'
    }
}