import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { place_order } from '../store/reducers/orderReducer';

const Shipping = () => {
   
   const {state: {products,price,shipping_fee,items}} = useLocation()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {userInfo} = useSelector(state => state.auth)

   const [res,setRes] = useState(false)
   const [state, setState] = useState({
      name: '',
      address: '',
      phone: '',
      post: '',
      province: '',
      city: '',
      area: ''
    })
//bemeneti adatok kinyerése a mezőkből
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
//Ha léteznek az adatok, akkor a setRes() értéke legyen igaz
    const save = (e) => {
        e.preventDefault()
        const {name,address,phone,post,province,city,area} = state;
        if (name && address && phone && post && province && city && area) {
            setRes(true)
        }
    }
   
 const placeOrder = () => {
   dispatch(place_order({
      price,
      products,
      shipping_fee,
      items,
      shippingInfo: state,
      userId: userInfo.id,
      navigate
   }))
 }

   return (
    <div>
      <Header/>
<section className='bg-[url("http://localhost:3000/images/banner/shop.png")]
 h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
  <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
    <div className='flex flex-col justify-center items-center gap-1
     h-full w-full text-white'>
      <h2 className='text-3xl font-bold'>Megrendelői oldal</h2>
        <div className='flex justify-center items-center gap-2 text-xl w-full'>
        <Link to='/'>Kezdőoldal</Link>
        <span className='pt-1'><IoIosArrowForward /></span>
        <span>Kiszállítás</span>
         </div>
    </div>
    </div>
  </div>
</section>

<section className='bg-[#eeeeee]'>
 <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
    <div className='w-full flex flex-wrap'>
     <div className='w-[67%] md-lg:w-full'>
        <div className='flex flex-col gap-3'>
{/*Űrlap megjelenítése*/}
         <div className='bg-white p-6 shadow-sm rounded-md'>
         <h2 className='text-slate-600 font-bold pb-3'>Szállítási információk</h2>

        {
            !res && <>
         <form onSubmit={save}>
            <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
             <div className='flex flex-col gap-1 mb-2 w-full'>
                <label htmlFor="name">Név</label>
                <input onChange={inputHandle} value={state.name} type="text"
                className='w-full px-3 py-2 border border-slate-200
                outline-none focus:border-green-500 rounded-md' name="name" id="name"
                placeholder='Név' />
             </div>

             <div className='flex flex-col gap-1 mb-2 w-full'>
                <label htmlFor="address">Cím</label>
                <input onChange={inputHandle} value={state.address} type="text"
                className='w-full px-3 py-2 border border-slate-200
                outline-none focus:border-green-500 rounded-md' name="address" id="address"
                placeholder='Utca/házszám/emelet/ajtó' />
             </div>
            </div>

            <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
             <div className='flex flex-col gap-1 mb-2 w-full'>
                <label htmlFor="phone">Telefonszám</label>
                <input onChange={inputHandle} value={state.phone} type="text"
                className='w-full px-3 py-2 border border-slate-200
                outline-none focus:border-green-500 rounded-md' name="phone" id="phone"
                placeholder='Telefonszám' />
             </div>

             <div className='flex flex-col gap-1 mb-2 w-full'>
                <label htmlFor="post">Irányítószám</label>
                <input onChange={inputHandle} value={state.post} type="text"
                className='w-full px-3 py-2 border border-slate-200
                outline-none focus:border-green-500 rounded-md' name="post" id="post"
                placeholder='Irányítószám' />
             </div>
            </div>

            <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
             <div className='flex flex-col gap-1 mb-2 w-full'>
                <label htmlFor="province">Vármegye</label>
                <input onChange={inputHandle} value={state.province} type="text"
                className='w-full px-3 py-2 border border-slate-200
                outline-none focus:border-green-500 rounded-md' name="province" id="province"
                placeholder='Vármegye' />
             </div>

             <div className='flex flex-col gap-1 mb-2 w-full'>
                <label htmlFor="city">Település</label>
                <input onChange={inputHandle} value={state.city} type="text"
                className='w-full px-3 py-2 border border-slate-200
                outline-none focus:border-green-500 rounded-md' name="city" id="city"
                placeholder='Település' />
             </div>
            </div>

            <div className='flex md:flex-col md:gap-2 w-full gap-5 text-slate-600'>
             <div className='flex flex-col gap-1 mb-2 w-full'>
                <label htmlFor="area">Kerület</label>
                <input onChange={inputHandle} value={state.area} type="text"
                className='w-full px-3 py-2 border border-slate-200
                outline-none focus:border-green-500 rounded-md' name="area" id="area"
                placeholder='Kerület' />
             </div>

             <div className='flex flex-col gap-1 mt-7 mb-2 w-full'>
                <button className='px-3 py-[6px] rounded-sm hover:shadow-green-500/50
                hover:shadow-lg bg-green-500 text-white'>Cím mentése</button>
             </div>
            </div>
         </form>
            </>
        }

        {
         res && <div className='flex flex-col gap-1'>
          <h2 className='text-slate-600 font-semibold pb-2'>Szállítás a következő címre: {state.name}</h2>
          <p>
           <span className='bg-blue-200 text-blue-800 text-sm font-medium
           mr-2 px-2 py-1 rounded'>Otthoni cím</span>
           <span>{state.phone} {state.province} {state.post} {state.city} {state.address} </span>

           <span onClick={() => setRes(false)}
           className='text-indigo-500 cursor-pointer'>Megváltoztat
           </span>
          </p>
          <p className='text-slate-600 text-sm'>Email küldése hamvai.ferenc@gmail.com címre</p>
         </div>
        }
        </div>
{/*Termékek*/}
    {
      products.map((p,i) => <div key={i} className='flex bg-white p-4 flex-col gap-2'>
      <div className='flex justify-start items-center'>
       <h2 className='text-md text-slate-600 font-bold'>{p.shopName}</h2>
      </div>
       {
        p.products.map((pt,i) => <div className='w-full flex flex-wrap'>
        <div className='flex sm:w-full gap-2 w-7/12'>
         <div className='flex gap-2 justify-start items-center'>
          <img className='w-[80px] h-[80px]'
          src={pt.productInfo.images[0]} alt="" />
           <div className='pr-4 text-slate-600'>
           <h2 className='text-md font-semibold'>{pt.productInfo.name}</h2>
           <span className='text-sm'>Gyártó: {pt.productInfo.brand}</span>
           </div>
          </div>
         </div>
      <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
   <div className='pl-4 sm:pl-0'>
   <h2 className='text-lg text-orange-500'>
    {pt.productInfo.price-Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)},-Ft</h2>
    <p className='line-through'>{pt.productInfo.price},-Ft</p>
    <p>-{pt.productInfo.discount}%</p>
   </div>
   </div>
  </div>)
  }
 </div>)
 }
    </div>
   </div>
{/*Megrendelés összesítő rész*/}
<div className='w-[33%] md-lg:w-full'>
    <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
      <div className='bg-white p-3
       text-slate-600 flex flex-col gap-3'>
          <h2 className='text-xl font-bold'>Megrendelés összesítő</h2>
          <div className='flex justify-between items-center'>
          <span>Termékek száma ({items})</span>
          <span>{price},-Ft</span>
          </div>
          <div className='flex justify-between items-center'>
          <span>Szállítási díj</span>
          <span>{shipping_fee},-Ft</span>
          </div>

          <div className='flex justify-between items-center'>
          <span>Végösszeg</span>
          <span>{price + shipping_fee},-Ft</span>
          </div>

          <div className='flex justify-between items-center'>
          <span>Fizetendő</span>
          <span className='text-lg text-[#059473]'>{price + shipping_fee},-Ft</span>
          </div>
          <button onClick={placeOrder} disabled={res ? false : true}
          className={`className='px-5 py-[6px] rounded-sm
         hover:shadow-red-500/50 hover:shadow-lg
          ${res ? 'bg-red-500' : 'bg-red-300'} text-sm text-white uppercase`}>
            Rendelés leadása
          </button>
       </div>

    </div>
  </div>
    </div>
 </div>
</section>
          <Footer/>
        </div>
    );
};
export default Shipping;