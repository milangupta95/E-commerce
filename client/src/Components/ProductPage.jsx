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
import { Button, Modal, TextField, Rating } from '@mui/material';
import { List } from 'react-content-loader'

function ProductPage() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState('');
    const [reviews, setReviews] = useState('');
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    let imageProps = {};
    if (!loading) {
        imageProps = {
            width: 300,
            height: 340,
            zoomPosition: "right",
            zoomWidth: 800,
            img: product.itemPicture
        };
    }


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

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
        handleClose();
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
            <List/> :
            <div className="mx-auto w-[100%]">
                <div className='mt-16'>
                    <section className="text-gray-700 body-font overflow-hidden bg-white">
                        <div className="w-[full] flex flex-col md:flex-row items-center justify-center px-5 py-6 mx-auto">
                            <div className='md:w-[40%] w-[100%]'>
                                <img src = {product.itemPicture} className='w-[350px] h-[400px]'/>
                            </div>
                            <div className='md:w-[30%] w-[100%]'>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{product.productName} - Rs. {product.price}</h1>
                                <div className="flex items-center mb-4">
                                    <span className='p-1 bg-slate-300 rounded'>{loading === true || product === '' ? 0 : product.rating.toFixed(1)}</span>
                                    <Rating value={product.rating} precision={0.5} readOnly />
                                    <span className="flex items-center ml-3 text-gray-600">
                                        <span className="ml-2">{product.numRating} Reviews</span>
                                    </span>
                                </div>
                                <p className="leading-relaxed mb-4">{product.description}</p>
                                <div className="flex items-center justify-between">
                                    <Button variant="outlined" color="primary" onClick={handleOpen}>
                                        Add a Review
                                    </Button>
                                    <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded" onClick={addProductToCart}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                    <div className='w-[100%] sm:w-[40%] p-4 mt-[20%] bg-white rounded-lg mx-auto'>
                        <div className='flex items-center justify-between'>
                            <div className='text-2xl'>
                                Add a Review - {product.productName}
                            </div>
                        </div>

                        <TextField
                            label="Your message"
                            multiline
                            rows={4}
                            value={review}
                            onChange={handleReviewChange}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <div className='item-center justify-between flex'>
                            <Rating size='large' name="rating" value={rating} onChange={handleRatingChange} />
                            <Button onClick={addReview} variant="contained" color="primary" disableElevation>
                                Add Review
                            </Button>
                        </div>

                    </div>
                </Modal>
                <div className='w-full flex items-center justify-center'>
                    {loading ? <div>Loading...</div> :
                    reviews.length === 0 ? <div className='text-center w-[full] text-red-500'> No Reviews To Show </div> :
                        <div className='overflow-y-scroll rounded-lg shadow-sm max-h-[400px] md:w-[65%] w-[100%] p-4'>
                            {reviews.map((review) => (
                                <ReviewPage key={review.id} review={review}></ReviewPage>
                            ))}
                        </div>
                    }
                </div>
            </div>
    )

}

export default ProductPage