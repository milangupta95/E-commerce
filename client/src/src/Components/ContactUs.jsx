import React from 'react'
import { useState } from 'react'
import api from '../utility';
import { Button, TextField } from '@mui/material';
function ContactUs() {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const emailChanger = (e) => {
        setEmail(e.target.value);
    }
    const subjectChanger = (e) => {
        setSubject(e.target.value);
    }

    const messageChanger = (e) => {
        setMessage(e.target.value);
    }

    const sendFeedback = async () => {
        try {
            await api.post("/sendFeedback", {
                email: "milangupta95@gmail.com",
                message: message,
                subject: subject
            });
            await api.post("/sendFeedback", {
                email: email,
                message: "Thanks For Your Feedback",
                subject: "Feedback Thanks"
            });
            window.alert("Feedback Has Been Send Successfully");
        } catch (err) {
            window.alert("There is Some Error");
        }
    }
    return (
        <div className='bg-gray-200 mt-5 border-t-2 border-grey-500 flex flex-col items-center justify-center w-full shadow-lg shadow-grey-800'>
            <h1 className='text-center text-3xl font-bold my-5 text-black'>Contact Us</h1>
            <form className='w-full flex flex-col items-center justify-center'>
                <div className='w-[70%] space-y-4 p-5'>
                    <div>
                        <TextField className="w-full" id="email" label="Email" variant="outlined" value={email} onChange={emailChanger} />
                    </div>
                    <div>
                        <TextField className="w-full" value={subject} onChange={subjectChanger} id="Subject" label="Subject" variant="outlined" />
                    </div>
                    <div class="sm:col-span-2">
                        <TextField className="w-full"
                            id="outlined-multiline-flexible"
                            label="Message"
                            multiline
                            minRows={4}
                            value={message} onChange={messageChanger}
                        />
                    </div>
                    <Button className = 'w-full' variant="contained" onClick={sendFeedback} size = "large" disableElevation>Send Message</Button>
                </div>

            </form>
        </div >
    )
}

export default ContactUs