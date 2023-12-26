import React from 'react'
import './ProductCard.css'
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { addToCart } from '../../Redux/actionHandlers';
import { Link } from 'react-router-dom';
import {Rating} from '@mui/material'

function ProductCard(params) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const cart = useSelector(state => state.cart.cart);
    const addProductToCart = () => {
        const pid = params.pid;
        const pname = params.name;
        const productPic = params.pic;
        const quantity = 1;
        const price = params.price;
        if (cart.find(prod => prod.productId === pid)) {
            window.alert('Product Already in Cart');
            return;
        }
        if (isLoggedIn) {
            dispatch(addToCart(quantity, pname, productPic, pid, price));
            window.alert('Product Added SuccessFully');
        } else {
            window.alert('You Must login First');
            return <Navigate to='/login'></Navigate>
        }
    }
    const link = `/product/${params.pid}`;
    return (
        <div class="w-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow" >
            <a href="#">
                <img class="rounded-t-lg w-[320px] h-[300px]" src={params.pic} alt="product image" />
            </a>
            <div class="px-5 pb-5">
                <Link to={link}>
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900">{params.name}</h5>
                </Link>
                <div class="flex items-center mt-2.5 mb-5">
                    <div class="flex items-center space-x-1 rtl:space-x-reverse">
                        <Rating value={params.rating} readOnly></Rating>
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{params.rating}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900">Rs {params.price}</span>
                    <button pid={params.pid} onClick={addProductToCart} class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                </div>
            </div>
        </div >
    )
}

export default ProductCard
