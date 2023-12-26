import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../utility';
import ProductStrip from './ProductStrip';
import ProductAdder from './ProductAdder';
import { useSelector } from 'react-redux';
function AdminPanel() {
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(true);
  const [addFormState, setAddFormState] = useState(false);
  useEffect(() => {
    async function getAllProducts() {
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
    getAllProducts();
  }, []);
  const isAdmin = useSelector((state) => state.login.user.role);
  console.log(isAdmin);
  return (
    <>
      {(!isAdmin || isAdmin !== 'admin') ? <div>You Have No Access to this page</div>
        : <div className='p-4'>
          <button className='p-2 rounded bg-green-500	mt-20 cursor-pointer' onClick={() => setAddFormState(!addFormState)}>Add a Product</button>
          <div className={addFormState ? "" : "hidden"}>
            <ProductAdder />
          </div>
          <h1 className='text-center text-2xl'>Products</h1>
          <div className='mt-2'>
            {loading === true ? <div>Loading...</div> :
              <div>
                {
                  products.map((product) => {
                    return <ProductStrip product={product} />
                  })
                }
              </div>
            }
          </div>
        </div>
      }
    </>
  )
}

export default AdminPanel