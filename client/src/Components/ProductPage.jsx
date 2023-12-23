import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from '../utility';
import { Navigate } from 'react-router-dom';
import _ from 'lodash'
import './ProductDesign.css'
import { addToCart } from '../Redux/actionHandlers';
import ReviewPage from './ReviewPage';
function ProductPage() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState('');
    const [reviews, setReviews] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    
    const params = useParams();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const cart = useSelector(state => state.cart.cart);
    
    useEffect(() => {
        setLoading(true);
        async function getData() {
            const id = params.id;
            let prod = await api.get(`product/getOneProduct/${id}`);
            let rev = await api.get(`review/getProductReview/${id}`);
            setProduct(prod.data.data);
            setReviews(rev.data.data);
        }
        getData();
        setLoading(false);
    }, [reviews]);
    const ratingChanger = (e) => {
        setRating(e.target.value);
    }

    const reviewChanger = (e) => {
        setReview(e.target.value);
    }

    const addReview = () => {
        const id = params.id;
        api.post(`review/addReview/${id}`, {
            comment: review,
            ratingGiven: rating
        }).then(res => {
            setReview(reviews => {
                return [...reviews, res.data.data]
            })
        }).catch(err => {
            window.alert(err.message);
        })
    }
    const addProductToCart = () => {
        const pid = params.id;
        const pname = product.productName;
        const productPic = product.itemPicture;
        const quantity = 1;
        const price = product.price;
        if (cart.find(prod => prod.productId === pid)) {
            window.alert('Product Already in Cart');
            return;
        }
        if (isLoggedIn) {
            dispatch(addToCart(quantity, pname, productPic, pid, price));
            window.alert('Product Added SuccessFully');
        } else {
            window.alert('You Must login First');
            return <Navigate to='/login'></Navigate>
        }
    }

    return (
        loading ?
            <div>Loading...</div> :
            <div>
                <div className='mt-16'>
                    <section class="text-gray-700 body-font overflow-hidden bg-white">
                        <div class="container px-5 py-6 mx-auto">
                            <div class="lg:w-4/5 mx-5 flex flex-wrap">
                                <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={product.itemPicture} />
                                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{product.productName}</h1>
                                    <div class="flex mb-4">
                                        <span className='p-0.5 bg-slate-300'>{loading === true || product === '' ? 0 : product.rating.toFixed(1)}</span>
                                        <span class="flex items-center">
                                            {
                                                _.times(Math.ceil(product.rating), (i) => {
                                                    return <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                    </svg>
                                                })
                                            }
                                            {
                                                _.times(Math.floor(5 - product.rating), (i) => {
                                                    return <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                    </svg>
                                                })
                                            }
                                            <span class="text-gray-600 ml-3">{product.numRating} Reviews</span>
                                        </span>
                                    </div>
                                    <p class="leading-relaxed">{product.description}</p>
                                    <div class="flex">
                                        <span class="title-font font-medium text-2xl text-gray-900">Rs {product.price}</span>
                                        <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={addProductToCart}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className='mx-28 mb-2 border-2 rounded-xs p-2'>
                    <div className='text-2xl text-center'><h1 >Add a Review</h1></div>
                    <br />
                    <form className='w-full'>
                        <label for='rating' className='pr-5'>Rating</label>
                        <input value={rating} onChange={ratingChanger} type='number' min='1' max='5' className='border-2 p-2' />
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea value={review} onChange={reviewChanger} id="message" rows="4" class="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                        <button onClick={addReview} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded'>Add Review</button>
                    </form>
                </div>
                <>
                    {reviews === '' ? <div>Loading...</div> :
                        <div className='review w-full'>
                            {
                                reviews.map((review) => {
                                    return (
                                        <ReviewPage review = {review}></ReviewPage>
                                    )
                                })
                            }
                        </div>
                    }
                </>

            </div>
    )
}

export default ProductPage