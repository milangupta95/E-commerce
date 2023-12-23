import React from 'react'
import './ProductCard.css'
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router';
import { addToCart } from '../../Redux/actionHandlers';
import { Link } from 'react-router-dom';
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
        <div className='bg-white h-[350px] w-[275px] flex flex-col my-2 shadow-sm shadow-grey-800 p-2 mr-[5px]'>
            <div className = 'h-[30px] border-b-2 border-gray-400 overflow-y-hidden'>
                <Link to={link}>
                    <h1 class="text-gray-700 font-bold text-xl hover:text-gray-900 uppercase">{params.name}</h1>
                </Link>
            </div>
            <img class="h-[260px] w-[300px] p-2 border-b-2 border-gray-400" src={params.pic} alt="product"/>
            <div class="flex items-center justify-between px-4 py-2">
                 <h1 class="text-gray-900 font-bold text-xl">Rs {params.price}</h1>
                 <button class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded hover:bg-gray-400" pid={params.pid} onClick={addProductToCart}>Add to cart</button>
             </div>
        </div>
    )
}

export default ProductCard