import React from 'react'
import { useState } from 'react';
import api from '../../utility';
function ProductStrip(props) {
    const product = props.product;
    const [formState, setFormState] = useState(false);
    const [pname, setPname] = useState(product.productName);
    const [desc, setDesc] = useState(product.description);
    const [categ, setCateg] = useState(product.category);
    const [numAv, setnumAv] = useState(product.numAvailable);
    const [itemPic, setitemPic] = useState(product.itemPicture);
    const [price, setPrice] = useState(product.price);
    const [deleteState,setDeletedState] = useState("Delete");
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

    const updateProduct = async () => {
        try {
            const updateProduct = {};
            if (pname !== product.productName) {
                updateProduct.productName = pname;
            }
            if (desc !== product.description) {
                updateProduct.description = desc;
            }
            if (categ !== product.category) {
                updateProduct.category = categ;
            }
            if (numAv !== product.numAvailable) {
                updateProduct.numAvailable = numAv;
            }
            if (itemPic !== product.itemPicture) {
                updateProduct.itemPicture = itemPic;
            }
            if (price !== product.price) {
                product.price = price;
            }
            if(updateProduct) {
                let res = await api.patch(`product/updateProduct/${product._id}`,{...updateProduct});
                if(res) {
                    if(res.status === 201) {
                        window.alert("Updated SuccessFully");
                    } else {
                        window.alert("Unable to update");
                    }
                }
            } else {
                window.alert("Please Do Any Update");
            }
        } catch(err) {
            window.alert(err.message);
        }
    }

    const deleteProduct = async() => {
        try {
            setDeletedState("Deleting...");
            let deletedProduct = await api.delete(`product/deleteProduct/${product._id}`);
            if(deletedProduct) {
                setDeletedState("Deleted");
                window.alert("Item Deleted SuccessFully");
            } else {
                setDeletedState("Delete");
                window.alert("Unable to delete Item");
            }
        } catch(err) {
            setDeletedState("Delete");
            window.alert(err.message);
        }
    }
    const changeFormState = () => {
        if (formState === true) {
            setFormState(false);
        } else {
            setFormState(true);
        }
    }
    return (
        <div className=' border-2 mt-2'>
            <div className='flex items-center justify-between p-2'>
                <div className='font-bold '>{product.productName} - <span className='text-blue-500'>{product.price}</span></div>
                <div>
                    <button className='mr-2 p-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded cursor-pointer' onClick={() => changeFormState()}>Update</button>
                    <button className='mr-2 p-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded cursor-pointer' onClick={() => deleteProduct()}>{deleteState}</button>
                </div>
            </div>
            <div className={formState === true ? "" : "hidden"}>
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
                    <button type='submit' className='mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded' onClick={() => updateProduct()}>Update Product</button>
                </form>
            </div>
        </div>
    )
}

export default ProductStrip