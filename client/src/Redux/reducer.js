import actionTypes from "./actionTypes";
import { combineReducers } from "redux";
const loginToken = localStorage.getItem('login');
const user = localStorage.getItem('user');
const loginintialState = (loginToken) ? {
    isLoggedIn: true,
    token: loginToken,
    loading: false,
    user: {...JSON.parse(user)}
} : {
    isLoggedIn:false,
    token: '',
    loading: true,
    user: {}
};
const loginReducer = (state = loginintialState,action) => {
    switch(action.type) {
        case actionTypes.LOGIN_SUCCESS : 
            return {
                ...state,
                isLoggedIn : true,
                token : action.token,
                loading: false,
                user: action.user
            }
        case actionTypes.LOGIN_ERROR : 
            return {
                ...state,
                token: '',
                isLoggedIn: false,
                loading: false,
                user: {},
            }
        case actionTypes.LOG_OUT : 
            return {
                ...state,
                token: '',
                isLoggedIn: false,
                laoding: false,
                user : {}
            }
        default:
            return state
    }
}
const cartIntialState = loginToken ? {
    cart : localStorage.getItem("cart") ? [] : [...JSON.parse(localStorage.getItem("cart"))],
} : {
    cart: []
}
const cartReducer = (state = cartIntialState,action) => {
    switch(action.type) {
        case actionTypes.GET_CART_SUCCESS: {
            return {
                ...state,
                cart : action.cart
            }
        }
        case actionTypes.GET_CART_FAIL: {
            return {
                ...state,
                cart: []
            }
        }
        case actionTypes.ADD_TO_CART_SUCCESS: {
            return {
                ...state,
                cart : [...state.cart,action.data]
            }
        }
        case actionTypes.ADD_TO_CART_FAIL: {
            return state
        }
        case actionTypes.QUANTITY_DECREASE_SUCCESS: {
            const prodToBeChanged = state.find(prod => prod.pid === action.pid);
            prodToBeChanged.quantity = prodToBeChanged.quantity - 1;
            localStorage.setItem('cart',state);
            return {
                ...state
            }
        }
        case actionTypes.QUANTITY_DECREASE_FAILED: {
            return state;
        }
        case actionTypes.QUANTITY_INCREASE_SUCCESS: {
            const prodToBeChanged = state.find(prod => prod.pid === action.pid);
            prodToBeChanged.quantity = prodToBeChanged.quantity + 1;
            localStorage.setItem('cart',state);
            return {
                ...state
            }
        }
        case actionTypes.QUANTITY_INCREASE_FAILED: {
            return state;
        }
        default:
            return state;
    }
}

const combinedReducers = combineReducers({
    login: loginReducer,
    cart: cartReducer
})
export default combinedReducers;