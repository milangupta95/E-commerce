import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutHandler } from '../Redux/actionHandlers';
import { Avatar, Button, IconButton } from '@mui/material'
function Navbar() {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logoutHandler());
        window.alert('You Have Been Logged Out of the E-store');
    }
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const user = useSelector(state => state.login.user);
    return (
        <div className='z-[100] bg-gray-100 fixed top-0 flex shadow-sm border-b-2 border-grey-800 shadow-grey-800 items-center justify-between w-full h-16 mb-18'>
            <div>
                <NavLink to='/home'>
                    <img src='https://www.svgrepo.com/show/255090/shopping-cart-online-store.svg' className='w-16 h-16 cursor-pointer p-2' />
                </NavLink>
            </div>
            <div>
                {
                    isLoggedIn ?
                        <div className='flex items-center'>
                            <IconButton onClick={handleLogOut} className='font-sans hover:font-serif text-xl'>
                                <img src = "https://cdn.iconscout.com/icon/free/png-256/free-logout-2032031-1713022.png?f=webp&w=256" className='w-12 h-12'/>
                            </IconButton>
                            <NavLink to='/profile' className='font-sans hover:font-serif text-xl'>
                                <Avatar src = {user.profilePic}></Avatar>
                            </NavLink>
                            <NavLink to='/cart' className='font-sans hover:font-serif text-xl'>
                                <IconButton>
                                    <img src = "https://svgsilh.com/svg_v2/294547.svg" className='w-10 h-10'/>
                                </IconButton>
                            </NavLink>
                        </div> :
                        <>
                            <Button>
                                <NavLink to='/login' className='font-sans text-xl'>Login</NavLink>
                            </Button>
                            <Button>
                                <NavLink to='/signup' className='font-sans text-xl'>Signup</NavLink>
                            </Button>
                        </>
                }
            </div>
        </div>
    )
}

export default Navbar