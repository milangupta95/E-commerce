import React from 'react'
import { useState, useEffect } from 'react'
import api from '../../utility';
import ProductStrip from './ProductStrip';
import ProductAdder from './ProductAdder';
import { useSelector } from 'react-redux';
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import OrdersTable from './OrdersPage';


function AdminPanel() {
  const [products, setProducts] = useState("");
  const [orders,setOrders] = useState([]);
  const [orderloading,setOrdersloading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [addFormState, setAddFormState] = useState(false);
  const [view, setView] = React.useState('inventory');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };
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

  useEffect(() => {
    async function getAllProducts() {
      setOrdersloading(true);
      try {
        const product = await api.get('/order/getAllOrders');
        if (product) {
          console.log(product);
          if (product.data.data.length > 0) {
            setOrdersloading(false);
            setOrders(product.data.data);
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
      {(!isAdmin || isAdmin !== 'admin') ? <div className='mt-20'>You Have No Access to this page</div>
        : <div className='p-4 mt-20 flex justify-between'>
          <div className='w-[20%]'>
            <ToggleButtonGroup
              sx={{ width: '100%' }}
              orientation="vertical"
              value={view}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="inventory" aria-label="list">
                Products
              </ToggleButton>
              <ToggleButton value="orders" aria-label="module">
                Orders
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {view === 'inventory' ? <div className='w-[75%]'>
            <button className='p-2 rounded bg-green-500	cursor-pointer' onClick={() => setAddFormState(!addFormState)}>Add a Product</button>
            <div className={addFormState ? "" : "hidden"}>
              <ProductAdder />
            </div>
            <h1 className='text-center text-2xl'>Products</h1>
            <div className='mt-2 h-[75vh] overflow-y-scroll'>
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
          </div> :
            <OrdersTable orders={orders} loading={orderloading}/>
          }

        </div>
      }
    </>
  )
}

export default AdminPanel