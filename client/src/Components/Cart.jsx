import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { cartGetterHandler } from '../Redux/actionHandlers';
import CartProduct from './CartProduct';
import StripeCheckout from 'react-stripe-checkout'
import api from '../utility';
import axios from 'axios';
import { TextField } from '@mui/material'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

async function displayRazorpay(product, orders,phone,address) {
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const result = await api.post("/payment", { product: product });

  if (!result) {
    alert("Server error. Are you online?");
    return;
  }

  const { amount, id: order_id, currency } = result.data;

  const options = {
    key: "rzp_test_YFhp3t3OiGpFIz", // Enter the Key ID generated from the Dashboard
    amount: amount.toString(),
    currency: currency,
    name: "E-Store",
    description: "Test Transaction",
    order_id: order_id,
    handler: async function (response) {
      const data = {
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };
      const result = await api.get("/payment/success");
      let makeOrderRes = await api.post('/order/makeOrder', {
        items: orders,
        phone: phone,
        address: address
      });
      if (makeOrderRes) {
        if (makeOrderRes.status === 201) {
          window.alert("Payment Made Successfully");
        } else {
          window.alert("There Might Be Some Error");
        }
      }
      console.log(result);
    },
    prefill: {
      name: "XYZ",
      email: "xyz@example.com",
      contact: "+91XXXXXXXXXX",
    },
    notes: {
      address: "E-Store,Lucknow",
    },
    theme: {
      color: "#61dafb",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

function Cart() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const cartProducts = useSelector(state => state.cart.cart);
  const totalPrice = cartProducts.reduce((pv, cv, ci) => pv + cv.price * cv.quantity, 0);
  const dispatch = useDispatch();
  const [callMade, setCallMade] = useState(0);
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    dispatch(cartGetterHandler());
  }, [dispatch, callMade]);
  const makePayment = async (token) => {
    if(phone.length !== 10 || address.length === 0) {
      window.alert("Please Enter a Valid Phone Number And Address");
      window.alert(phone.length + " " + address.length);
      return;
    }
    const orders = [];
    const names = cartProducts.map(product => {
      orders.push({
        productId: product.productId,
        quantity: product.quantity
      });
      return product.pname
    });

    const product = {
      names,
      price: totalPrice
    }
    displayRazorpay(product, orders,phone,address);
  }
  console.log(cartProducts);
  return (
    <div className='h-[95vh] mt-8 overflow-y-scroll bg-gray-100'>
      {
        isLoggedIn ?
          <div>
            {cartProducts.length === 0 || cartProducts === null || cartProducts === undefined || cartProducts.length === 0 ? <div className='text-center text-3xl item-center justify-center flex'>No Item In Cart</div> :
              <div className="h-[full] w-[full]">
                <h1 className="h-[full] w-[full] mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto h-[full]  w-[full] max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                  <div className="rounded-lg w-[60%]">
                    {cartProducts.map(product => {
                      return (
                        <CartProduct key={product.pid} pname={product.pname}
                          price={product.price}
                          pic={product.productPic}
                          quantity={product.quantity}
                          pid={product._id}
                          callMade={callMade}
                          setCallMade={setCallMade}
                        ></CartProduct>
                      )
                    })}
                  </div>
                  <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 w-[40%]">
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
                    <hr className="my-4" />
                    <form className='space-y-4'>
                      <label className='font-bold text-xl'>Enter Delivery Details</label>
                      <TextField className='w-full' label="Mobile"
                        value={phone} onChange={(e) => setPhoneNumber(e.target.value)}></TextField>
                      <TextField
                        label="Address"
                        className='w-full'
                        value = {address}
                        onChange={(e) => setAddress(e.target.value)}
                        multiline
                        rows={4}
                      />
                    </form>
                    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={makePayment}>Check out</button>
                  </div>
                </div>
              </div>
            }
          </div> :
          <Navigate to='/login'></Navigate>
      }
    </div>
  )
}

export default Cart