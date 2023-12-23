import React from 'react'
import { useState } from 'react'
import api from '../../utility';
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextField,Button } from '@mui/material';
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const updateEmail = (e) => {
        setEmail(e.target.value);
    }
    const sendOtp = async (emaili) => {
        let flag = false;
        setLoading(true);
        try {
            let res = await api.post('auth/forgotpassword', {
                email: emaili
            });
            if (res) {
                flag = true;
                setLoading(false);
                window.alert("Otp Has Been Send to your email id");
            }
        } catch (err) {
            setLoading(false);
            window.alert(err.message);
        }
        while (loading);
        return flag;
    }

    const otpSender = async (e) => {
        e.preventDefault();
        try {
            let isSend = await sendOtp(email);
            console.log(isSend);
            while (loading);
            if (loading === false) {
                if (isSend) {
                    history('../resetpassword', { replace: true });
                } else {
                    history('../forgotpassword', { replace: true });
                }
            }
        } catch (err) {
            window.alert(err.message);
            history('../forgotpassword', { replace: true });
        }
    }
    return (
        isLoggedIn ? <Navigate to='/home'></Navigate> :
            <div className='flex items-center justify-center p-5 w-full h-screen'>
                <div className='w-[100%] border-2 border-gray-400 p-5 rounded-lg sm:w-[400px]'>
                    <h1 class="text-2xl mb-10 text-center font-bold">
                        Forgot Password
                    </h1>
                    <form className='space-y-4 md:space-y-6'>
                        <div>
                            <TextField onChange={updateEmail} value={email}  variant='outlined' className='w-full' label='Email'></TextField>
                        </div>
                        <Button onClick={otpSender} className = "w-full" variant='contained' size="large" disableElevation>Send OTP</Button>
                    </form>
                </div>
            </div>
    )
}

export default ForgotPassword