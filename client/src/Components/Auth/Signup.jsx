import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import * as EmailValidator from 'email-validator';
import { useNavigate } from 'react-router-dom';
import api from '../../utility';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { TextField,Button } from '@mui/material';
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const history = useNavigate();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const nameChanger = (e) => {
        setName(e.target.value);
    }
    const emailChanger = (e) => {
        setEmail(e.target.value);
    }
    const passwordChanger = (e) => {
        setPassword(e.target.value);
    }
    const confirmPasswordChanger = (e) => {
        setconfirmPassword(e.target.value);
    }

    const profilePicChanger = (e) => {
        setProfilePic(e.target.value);
    }

    const signup = async () => {
        try {
            if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                window.alert("You Must Fill all information");
            } else {
                let isEmailValid = EmailValidator.validate(email);
                if (isEmailValid) {
                    if (password.length < 6) {
                        window.alert("Password Must be of length 6");
                    } else {
                        if (password !== confirmPassword) {
                            window.alert("Password and Confirm Password Didn't Match");
                        } else {
                            let res = await api.post('auth/signup', {
                                name: name,
                                email: email,
                                password: password,
                                profilepic: profilePic
                            });
                            if (res.status === 201) {
                                window.alert("Your Account Has Been SuccessFully Created Please Login");
                                history('/login');
                            } else {
                                window.alert('Something Went Wrong');
                            }
                        }
                    }
                } else {
                    window.alert("Email You Entered is Not Valid")
                }
            }
        } catch (err) {
            window.alert(err.message);
        }
    }
    return (
        isLoggedIn ? <Navigate to='/home'></Navigate> :
            <div className='mt-10 flex items-center justify-center w-full h-screen'>
                <div className='space-y-4 p-5 rounded-lg w-[90%] md:w-[400px] sm:w-[400px] border-2 border-gray-300'>
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <div>
                        <TextField
                            variant='outlined'
                            value={name}
                            onChange={nameChanger}
                            className="w-full"
                            label="Full Name"
                        />
                    </div>
                    <div>
                        <TextField
                            variant='outlined'
                            value={email}
                            onChange={emailChanger}
                            className="w-full"
                            label="Email"
                        />
                    </div>
                    <div>
                        <TextField
                            variant='outlined'
                            value={password}
                            onChange={passwordChanger}
                            type = "password"
                            className="w-full"
                            label="Password"
                        />
                    </div>
                    <div>
                        <TextField
                            variant='outlined'
                            value={confirmPassword}
                            onChange={confirmPasswordChanger}
                            className="w-full"
                            label="Confirm Password"
                        />
                    </div>
                    <div>
                        <TextField
                            variant='outlined'
                            value={profilePic}
                            onChange={profilePicChanger}
                            className="w-full"
                            label="Profile Pic"
                        />
                    </div>
                    <Button onClick = {signup} variant='contained' className='w-full' size="large" disableElevation>Signup</Button>
                    <p>Already Have an Account <NavLink to ='/login' className="text-sky-400 hover:text-sky-800">Sign In</NavLink></p>
                </div>
            </div>
    )
}

export default Signup