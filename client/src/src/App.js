import React from 'react'
import Navbar from './Components/Navbar'
import { Route } from 'react-router'
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Profile from './Components/Profile';
import ForgotPassword from './Components/Auth/ForgotPassword';
import ResetPassword from './Components/Auth/ResetPassword';
import { Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Cart from './Components/Cart';
import ProductPage from './Components/ProductPage';
import PaymentSuccess from './Components/PaymentSuccess';
import Footer from './Components/Footer';
import AdminPanel from './Components/Admin/AdminPanel';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/adminPanel' Component={AdminPanel}></Route>
          <Route path='/home' Component={Home}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/signup' Component={Signup}></Route>
          <Route path='/resetpassword' Component={ResetPassword}></Route>
          <Route path='/forgotpassword' Component={ForgotPassword}></Route>
          <Route path='/profile' Component={Profile}></Route>
          <Route path='/cart' Component={Cart}></Route>
          <Route path='/product/:id/' Component={ProductPage}></Route>
          <Route path='/paymentSuccess' Component={PaymentSuccess}></Route>
          <Route path='*' Component={() => <Navigate to='/home' />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </Provider>
  )
}

export default App
