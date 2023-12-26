import api from '../utility';
import React from 'react'
import { useEffect, useState } from 'react'
import ProductCard from './Product/ProductCard';
import Pagination from './Product/Pagination'
import { BulletList } from 'react-content-loader'

function Home() {
    const [products, setProducts] = useState('');
    const [loading, setLoading] = useState(true);
    const [currPage, setcurrPage] = useState(1);

    const pageChange = (page) => {
        setcurrPage(page);
    }

    const increasePage = () => {
        if (currPage >= products.length / 10) {

        } else {
            setcurrPage(page => page + 1);
        }
    }

    const decreasePage = () => {
        if (currPage <= 1) {

        } else {
            setcurrPage(page => page - 1);
        }
    }
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const product = await api.get('product/getAllProduct');
                if (product) {
                    if (product.data.products.length > 0) {
                        setLoading(false);
                        setProducts(product.data.products);
                    } else {
                        setLoading(false);
                    }
                }
            } catch (err) {
                window.alert("No Data is Found" + err.message);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <div className='mt-16'>
            {
                (loading === true || products === '') ? <div className='p-4 w-[full]'><BulletList/></div> :
                    <>
                        <div className='flex flex-wrap h-fit bg-gray-100 items-center justify-center p-4 gap-y-4 gap-x-8'>
                            {
                                products.slice((currPage - 1) * 10, currPage * 10).map((product) => {
                                    return (
                                        <ProductCard pid={product._id} name={product.productName}
                                            desc={product.description} category={product.category}
                                            price={product.price} ava={product.numAvailable}
                                            pic={product.itemPicture} rating={product.rating}
                                        />
                                    )
                                })
                            }
                        </div>
                        <Pagination increasePage={increasePage} decreasePage={decreasePage} active={currPage} pageChange={(page) => pageChange(page)} pages={Math.ceil(products.length / 10)}></Pagination>
                    </>
            }
        </div>
    )
}

export default Home