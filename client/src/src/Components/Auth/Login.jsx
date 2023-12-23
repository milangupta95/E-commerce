import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loginHandler } from '../../Redux/actionHandlers';
import { TextField,Button } from '@mui/material';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

    const loginClick = (e) => {
        e.preventDefault();
        dispatch(loginHandler(email, password));
    }
    return (
        <>
            {isLoggedIn ? <Navigate to='/home'> </Navigate> :

                <div className='h-screen flex items-center justify-center w-full'>
                    <div className='p-5 w-[90%] md:w-[400px] sm:w-[400px] border-2 border-gray-300 rounded-lg'>
                        <h1 className="text-center font-bold text-2xl">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6 mt-5" action="post">
                            <div>
                                <TextField onChange={updateEmail} value={email} className='w-full' variant='outlined' label='Email'></TextField>
                            </div>
                            <div>
                                <TextField variant='outlined' label='Password' onChange={updatePassword} value={password} type="password" name="password" id="password" className='w-full' />
                            </div>
                            <div className='flex justify-between items-center w-full text-sky-500 hover:text-sky-900'>
                                <NavLink to = '/forgotPassword'>Forgot Password</NavLink>
                                <NavLink to = '/signup'>Sign Up</NavLink>
                            </div>
                            <div>
                                <Button variant='contained' className='w-full' onClick={loginClick} size="large" disableElevation>Sign in</Button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
export default Login