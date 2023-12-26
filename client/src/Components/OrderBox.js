import React from 'react'
import SliderComponent from './SliderComponent'
import { Button } from '@mui/material'
function OrderBox({product}) {
  return (
    <div className='w-full shadow-sm rounded-lg shadow-gray-500 mx-auto p-2 border-gray-500 h-fit rounded-md'>
      <div className='h-fit'>
        <div className='flex md:flex-row flex-col items-center justify-between h-[30%] border-b'>
          <div>
            <p>Order Id: <span className='font-bold'>{product._id} - <span className='text-green-600'>{product.status}</span></span></p>
            <p>Date: <span className='font-bold'>{product.dateBought.substring(0,product.dateBought.indexOf('T'))}</span></p>
          </div>

          <div className='md:space-x-2'>
            <Button variant='outlined' color='primary'>Track Order</Button>
            <Button variant='outlined' color='error'>Cancel Order</Button>
          </div>
        </div>
        <div className='flex md:flex-row flex-col h-[70%] border-b'>
          <div className='md:w-[50%] px-2 h-[100%] md:border-r'>
            <p className='font-bold text-lg'>Contact Details</p>
            <p className='font text-sm'>Phone Number: {product.phone}</p>
            <p className='font text-sm'>{product.address}</p>
          </div>
          <div className='md:w-[50%] h-[full] px-2'>
            <p className='font-bold text-lg'>Payment Details</p>
            <p className='font text-sm'>Payment Method: Visa Card</p>
            <p className='font text-sm'>Total Bill: {product.price}</p>
          </div>
        </div>
      </div>
      <SliderComponent items={product.items}/>
    </div>
  )
}

export default OrderBox