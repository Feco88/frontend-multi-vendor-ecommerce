import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF } from 'react-icons/fa6';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const Login = () => {
 const navigate = useNavigate()
 const {loader,errorMessage,successMessage,userInfo} = useSelector(state => state.auth)

 const dispatch = useDispatch()
 
 const [state, setState] = useState({
    email: '',
    password: ''
 })

 const inputHandle = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
 }
 const login = (e) => {
    e.preventDefault()
    dispatch(customer_login(state))
 }

//üzenet kiírása a felhasználók számára
 useEffect(() => {
    if (successMessage) {
        toast.success(successMessage)
        dispatch(messageClear())
    }
    if (errorMessage) {
        toast.error(errorMessage)
        dispatch(messageClear())
    }
    if (userInfo) {
        navigate('/')
    }
 },[successMessage,errorMessage])

    return (
     <div>
        {
        loader && <div className='w-screen h-screen flex
         justify-center items-center fixed left-0 top-0
         bg-[#38303033] z-[999]'>
        <FadeLoader/>
        </div>
        }
      <Header />
    <div className='bg-slate-200 mt-4'>
     <div className='w-full justify-center items-center p-10'>
      <div className='grid grid-cols-2 w-[60%] mx-auto bg-white
      rounded-md'>
        <div className='px-8 py-8'>
        <h2 className='text-center w-full text-xl
        text-slate-600 font-bold'>Bejelentkezés</h2>
        <div className='text-center text-slate-600'>
        <span>Belépés meglévő fiókba</span>
        </div>
    <div>
        <form onSubmit={login} className='text-slate-600'>
         <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor="email">Email</label>
          <input onChange={inputHandle} value={state.email}
          className='w-full px-3 py-2 border border-slate-200
          outline-none focus:border-green-500 rounded-md' type="email"
          name="email" id="email" placeholder='E-mail cím' required/>
         </div>
         <div className='flex flex-col gap-1 mb-2'>
          <label htmlFor="password">Jelszó</label>
          <input  onChange={inputHandle} value={state.password}
          className='w-full px-3 py-2 border border-slate-200
          outline-none focus:border-green-500 rounded-md' type="password"
          name="password" id="password" placeholder='Jelszó' required/>
         </div>

        <button className='px-8 w-full py-2 bg-[#059473] shadow-lg
        hover:shadow-green-500/40 text-white rounded-md'>
         Bejelentkezés</button>
        </form>

    <div className='flex justify-center items-center py-2'>
     <div className='h-[1px] bg-slate-300 w-[90%]'></div>
        <span className='px-3 text-slate-600'>Vagy</span>
     <div className='h-[1px] bg-slate-300 w-[90%]'></div>
    </div>

    <button className='px-8 w-full py-2 bg-blue-500 shadow-lg
    hover:shadow-blue-500/50 text-white rounded-md flex
    justify-center items-center gap-2 mb-3'>
        <span><FaFacebookF /></span>
        <span>Facebook belépés</span>
    </button>

    <button className='px-8 w-full py-2 bg-red-500 shadow-lg
    hover:shadow-red-500/50 text-white rounded-md flex
    justify-center items-center gap-2 mb-3'>
        <span><FaGoogle /></span>
        <span>Google belépés</span>
    </button>
    </div>
    <div className='text-center text-slate-600 pt-1'>
     <p>Nincs még fiókod? <Link className='text-blue-500' to={'/register'}>
     Regisztráció</Link></p>
    </div>

 <a target='_blank' href="http://localhost:3001/login">
  <div className='mt-5 px-8 w-full py-2 bg-[#6a108d] shadow-lg hover:shadow-purple-500/50
  text-white rounded-md flex justify-center items-center gap-2 mb-3'>
    Bejelentkezés eladóként
  </div>
 </a>

 <a target='_blank' href="http://localhost:3001/register">
  <div className='px-8 w-full py-2 bg-[#d46e1a] shadow-lg hover:shadow-orange-500/50
  text-white rounded-md flex justify-center items-center gap-2 mb-3'>
    Eladóként regisztrálok
  </div>
 </a>

      </div>
    <div className='w-full h-full py-4 pr-4'>
        <img src="http://localhost:3000/images/login.jpg" alt="" />
    </div>
    </div>
     </div>
    </div>
      <Footer />
     </div>
    );
};
export default Login;