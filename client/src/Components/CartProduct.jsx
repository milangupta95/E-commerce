import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProductFromCart, quantityDecrease, quantityIncrease } from '../Redux/actionHandlers';
function CartProduct(props) {
    const dispatch = useDispatch();
    let setCallMade = props.setCallMade;
    const increaseQuan = () => {
        dispatch(quantityIncrease(props.pid, props.quantity));
        setCallMade(() => props.callMade + 1);

    }

    const decreaseQuan = () => {
        if (props.quantity === 1) {
            window.alert("Can't make Quantity 0 Remove Item");
            return;
        }
        dispatch(quantityDecrease(props.pid, props.quantity));
        setCallMade(() => props.callMade + 1);
    }

    const deleteProduct = () => {
        dispatch(deleteProductFromCart(props.pid));
        setCallMade(() => props.callMade + 1);
    }
    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={props.pic} className="w-full rounded-lg sm:w-40" alt='' />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{props.pname}</h2>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={decreaseQuan}> - </span>
                        <input className="h-8 w-12 border bg-white text-center text-sm outline-none" type="number" value={props.quantity} min="1" />
                        <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={increaseQuan}> + </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm font-semibold">${(props.price * props.quantity).toFixed(2)}</p>
                        <svg onClick={deleteProduct} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 cursor-pointer duration-150 hover:text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CartProduct


