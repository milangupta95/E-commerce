import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './ProductAdder.css'
function ProductAdder() {
    const [pname, setPname] = useState('');
    const [desc, setDesc] = useState('');
    const [categ, setCateg] = useState('');
    const [numAv, setnumAv] = useState(0);
    const [itemPic, setitemPic] = useState('');
    const [price, setPrice] = useState(0);

    const priceChanger = (e) => {
        setPrice(e.target.value);
    }

    const PnameChanger = (e) => {
        setPname(e.target.value);
    }

    const DescChanger = (e) => {
        setDesc(e.target.value);
    }

    const CategChanger = (e) => {
        setCateg(e.target.value);
    }

    const numAvChanger = (e) => {
        setnumAv(e.target.value);
    }

    const itemPicChanger = (e) => {
        setitemPic(e.target.value);
    }

    const addProduct = async function (e) {
        try {
            let res = await axios.post('http://localhost:3000/product/addProduct', {
                productName: pname,
                description: desc,
                category: categ,
                money: price,
                numAvailable: numAv,
                itemPicture: itemPic
            });
            if (res.status === 201) {
                window.alert("Added");
            } else {
                window.alert("Not Added");
            }
        } catch (err) {
            window.alert(err.message);
        }
        e.preventDefault();
    }
    return (
        <div>
            <h1 className='text-3xl'>Enter Product Details Here </h1>
            <form formAction='post' className='bg-gray-200 p-2'>
                <div>
                    <label className='text-sm font-bold text-gray-90'>Product Name</label><br />
                    <input type='text' placeholder='Product Name' className="w-full p-2 border-2 border-gray-400 rounded" value={pname} onChange={PnameChanger} />
                </div>
                <div>
                    <label className='text-sm font-bold text-gray-900'> Price </label><br />
                    <input type='number' min='1' placeholder='1' className="w-full p-2 border-2 border-gray-400 rounded" value={price} onChange={priceChanger} />
                </div>
                <div>
                    <label className='text-sm font-bold text-gray-900'>Description</label><br />
                    <textarea className='w-full p-2 border-2 border-gray-400 rounded' value={desc} onChange={DescChanger}></textarea>
                </div>
                <div>
                    <label className='text-sm font-bold text-gray-900'>Category</label><br />
                    <input type='text' placeholder='Enter the Category' className="w-full p-2 border-2 border-gray-400 rounded" value={categ} onChange={CategChanger} />
                </div>
                <div>
                    <label className='text-sm font-bold text-gray-900'> No of Items Available</label><br />
                    <input type='number' min='1' className="w-full p-2 border-2 border-gray-400 rounded" value={numAv} onChange={numAvChanger} />
                </div>
                <div>
                    <label className='text-sm font-bold text-gray-900'>Link for Item Picture</label><br />
                    <input type='text' placeholder='Give The Link for Picture' className="w-full p-2 border-2 border-gray-400 rounded" value={itemPic} onChange={itemPicChanger} />
                </div>
                <button type='submit' className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded' onClick={() => addProduct()}>Add Product</button>
            </form>
        </div>
    )
}

export default ProductAdder