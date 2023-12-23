import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { cartGetterHandler } from '../Redux/actionHandlers';
import CartProduct from './CartProduct';
import StripeCheckout from 'react-stripe-checkout'

import api from '../utility';

function Cart() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const cartProducts = useSelector(state => state.cart.cart);
  const totalPrice = cartProducts.reduce((pv,cv,ci) => pv + cv.price * cv.quantity,0);     
  const dispatch = useDispatch();
  dispatch(cartGetterHandler());
  const makePayment = (token) => {
    const names = cartProducts.map(product => {
      return product.pname
    });
    const product = {
      names,
      price: totalPrice
    }
    return api.post('/payment',{
      token: token,
      product: product
    }).then(res => {
      console.log(res);
      const {status} = res;
      console.log(status);
      return <Navigate to = '/paymentSuccess'></Navigate>
    }).catch(err => {
      console.log(err.message);
    });
  }
  return (
    <>
      {
        isLoggedIn ? 
        <>
        {cartProducts.length === 0 || cartProducts === null || cartProducts === undefined || cartProducts === [] ? <div className='text-center text-3xl item-center justify-center flex'>No Item In Cart</div>:
            <div className="h-fit bg-gray-100 pt-20">
              <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
              <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                  {cartProducts.map(product => {
                    return (
                      <CartProduct key = {product.pid} pname = {product.pname}
                       price = {product.price} 
                       pic = {product.productPic} 
                       quantity = {product.quantity}
                      pid = {product._id}></CartProduct>
                    )
                  })}
                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Subtotal</p>
                    <p className="text-gray-700">Rs {totalPrice}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    <p className="text-gray-700">Rs 0</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className="">
                      <p className="mb-1 text-lg font-bold">Rs {totalPrice}</p>
                      <p className="text-sm text-gray-700">including VAT</p>
                    </div>
                  </div>
                  <StripeCheckout
                  stripeKey='pk_test_51N05z8SIxFF90szGJ3b5QdS6Q06Bj30KxnQkjFOXEHZAb6DgD12jSxoQBeQXaJ32zP8RpjcJ1ey9KQyGyCn9WRVP00pih4See2'
                  token={makePayment}
                  >
                    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                  </StripeCheckout>
                  
                </div>
              </div>
            </div>
        }   
        </>:
          <Navigate to='/login'></Navigate>
      }
    </>
  )
}

export default Cart