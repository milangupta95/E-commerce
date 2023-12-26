import React from 'react'
import { useState } from 'react';
import api from '../utility';
import { useSelector } from 'react-redux';
import {Rating} from '@mui/material'
import _ from 'lodash'
function ReviewPage(props) {
    const review = props.review;
    const [toggleEdit,setToggleEdit] = useState(true);
    const [editRating,setEditRating] = useState(review.ratingGiven);
    const [editComment,setEditComment] = useState(review.comment);
    const [editClass,setEditClass] = useState("hidden");
    const user = useSelector(state => state.login.user);
    const editReview = () => {
        if(toggleEdit === true) {
            setEditClass("block");
            setToggleEdit(false);
        } else {
            setEditClass("hidden");
            setToggleEdit(true);
        }
    }
    const deleteReview = (reviewId) => {
        api.delete(`review/deleteReview/${reviewId}`).then((res) => {
            window.alert("Review has Been Deleted SuccessFully");
        }).catch((err) => {
            window.alert("Can't delete Review" + err.message);
        })
    }
    const changeReview = (reviewId) => {
        api.patch(`review/updateReview/${reviewId}`,{
            ratingGiven: editRating,
            comment:editComment
        }).then(res => {
            window.alert("The Review Has Been Chnaged Success");
        }).catch(err => {
            window.alert("There is Problem While Editing Review" + err.message);
        })
    }

    return (
        <div class="w-[full]">
            <div class="border-b border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col">
                <div class="">
                    <div class="flex">
                        <img class="w-10 h-10 rounded-full mr-2" src={review.userId.profilePic} alt="Avatar of Jonathan Reinink" />
                        <div class="text-sm">
                            <p class="text-gray-900 leading-none mb-2">{review.userId.name}</p>
                            <Rating name="half-rating-read" defaultValue={review.ratingGiven} precision={0.5} readOnly />
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-3'>
                        <div>
                            <p class="text-gray-700 text-base mr-10">{review.comment}</p>
                        </div>
                        
                        {
                            user._id === review.userId._id ? <div className='justify-self-end'>
                                <button onClick={editReview}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                                </button>
                                <button onClick={() => deleteReview(review._id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                </button>
                            </div> : <>
                            </>
                        }
                    </div>
                    <div>
                        {new Date(review.dateOfReview).toLocaleString()}
                    </div>
                    <div className={editClass}>
                        <form className = 'border-2 p-2'>
                            <div>
                                <label for='rating' className ='mr-5'>Rating</label>
                                <input type='number' className=' border-2 h-10 w-10 p-1' value={editRating} onChange={(e) => setEditRating(e.target.value)} />
                            </div>
                            <div>
                                <label for='comment'>Comment</label>
                                <textarea  rows="4" class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." value={editComment} onChange={(e) => setEditComment(e.target.value)}></textarea>
                            </div>
                            <button className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => changeReview(review._id)}>Edit Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewPage