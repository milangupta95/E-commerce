import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import api from '../utility';
import { Avatar,Button,ButtonGroup } from '@mui/material';
import OrderBox from './OrderBox';

function Profile() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState();
  useEffect(() => {
    (async function loadData() {
      setLoading(true);
      try {
        let res = await api.get('/order/getCustomerOrder');
        if (res) {
          if (res.status === 200) {
            setOrders(res.data.data);
            setLoading(false);
            console.log(res.data.data);
          }
          console.log(res.status);
        }
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    })();
  }, [])
  return (
    <>
      {isLoggedIn ?
        <div className='w-full md:flex mt-20 '>
          <div className='md:w-[30%] p-4'>
            <ButtonGroup
              sx = {{width : '100%'}}
              orientation="vertical"
            >
              <Button key="main" >Main</Button>
              <Button key="actstng">Account Setting</Button>
              <Button key="logout">Logout</Button>
            </ButtonGroup>
          </div>
          <div className='h-[90vh] md:w-[70%] shadow-sm rounded-lg shadow-gray-300 mx-auto'>
            <div className='flex items-center space-x-4 justify-between border-b p-4 mx-auto'>
              <Avatar
                alt={user.name}
                src={user.profilePic}
                sx={{ width: 56, height: 56 }}
              />
              <div>
                <div className="text-center text-sm text-gray-900 font-medium">{user.name}</div>
                <div className="text-center text-sm text-gray-500 font-medium">Email: {user.email}</div>
              </div>
            </div>
            <div className=''>
              <p className='font-bold text-xl p-2'>Order History</p>
              {
                loading ? <div>Loading...</div> : <div className='h-[70vh] space-y-2 shadow-gray-300 overflow-y-scroll p-2'>{
                  orders.map((order) => {
                    return <OrderBox product={order} />
                  })
                }</div>
              }
            </div>
          </div>
        </div>
        :
        <Navigate to='/login'>
        </Navigate>
      }
    </>
  )
}

export default Profile