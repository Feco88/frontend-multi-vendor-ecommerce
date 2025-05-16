import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import error from '../assets/error.png';
import success from '../assets/success.png';
import { FadeLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import axios from 'axios';

//load függvény elkészítése, ami visszaadja a nyilvános kulcsot
const load = async () => {
 return await loadStripe('pk_test_51RIaNr4ZvLDdG4ulgcOcgkHUEWnUgoz5oxudUzMAfZK0uqhe1AQnnSD5Kr62ZFUQpVZyOBRAjEOfIFBNBfJ3DxA700dYgLPOis')
}

const ConfirmOrder = () => {
 const [loader, setLoader] = useState(true)
 const [stripe, setStripe] = useState('')
 const [message, setMessage] = useState(null)
//ha nincs stripe kódunk, akkor térjen vissza közvetlenül
 useEffect(() => {
  if (!stripe) {
   return
   }
   //clientSecret kulcs visszanyerése az URL-ből (payment_intent_client_secret)
    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
    //ha nincs clientSecret kulcs, akkor térjen vissza közvetlenül
    if (!clientSecret) {
     return
     }
    //kezeljük a különböző állapotokat az URL-ben
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
     switch(paymentIntent.status){
      case "succeeded":
        setMessage('succeeded')
        break
        case "processing":
        setMessage('processing')
        break
        case "requires_payment_method":
        setMessage('failed')
        break
        default:
        setMessage('failed')
     }
    })
   },[stripe])
//Fizetés állapotának frissítése vásárlónál a megrendelések kifizetése után
 const update_payment = async () => {
    const orderId = localStorage.getItem('orderId')
    if (orderId) {
     try {
        await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`)
        localStorage.removeItem('orderId')
        setLoader(false)
     } catch (error) {
        console.log(error.response.data)
     }
    }
 }

 useEffect(() => {
    if (message === 'succeeded') {
      update_payment()
    }
 },[message])

//get_load() függvény elkészítése, amiben meghívjuk a load() függvényt
//megkapjuk a nyilvános kulcsot
 const get_load = async () => {
  const tempStripe = await load()
    setStripe(tempStripe)
  }
    
 useEffect(() => {
    get_load()
 },[])

return (
  <div className='w-screen h-screen flex justify-center items-center
  flex-col gap-4'>
    {
        (message === 'failed' || message === 'processing') ? <>
        <img src={error} alt="" />
        <Link to='/dashboard/my-orders' className='px-5 py-2
         bg-green-500 rounded-sm text-white'>
           Vissza a Vásárlói irányítópulthoz</Link>
        </> : message === 'succeeded' ? loader ? <FadeLoader/> : <>
        <img src={success} alt=""/>
        <Link to='/dashboard/my-orders' className='px-5 py-2
         bg-green-500 rounded-sm text-white'>
           Vissza a Vásárlói irányítópulthoz</Link>
        </> : <FadeLoader/>
    }
  </div>
 );
};

export default ConfirmOrder;