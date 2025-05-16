import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';

 //adjuk meg a nyilvános API kulcsot a stripe.com oldalról
 const stripePromise = loadStripe('pk_test_51RIaNr4ZvLDdG4ulgcOcgkHUEWnUgoz5oxudUzMAfZK0uqhe1AQnnSD5Kr62ZFUQpVZyOBRAjEOfIFBNBfJ3DxA700dYgLPOis')

 const Stripe = ({ price, orderId}) => {
  //nyilvános API kulcs kezeléséhez beállítjuk a clientSecret állapotot
  const [clientSecret, setClientSecret] = useState('')
  //stripe megjelenés beállítása
  const appearance = {
   theme: 'stripe'
  }
  const options = {
   appearance,
   clientSecret
  }

  const create_payment = async () =>{
    try {
      const {data} = await axios.post('http://localhost:5000/api/order/create-payment',
      { price },{ withCredentials: true })
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.log(error.response.data)
    }
  }

 return (
  <div className='mt-4'>
    {
     clientSecret ? (
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm orderId={orderId} />
      </Elements>
     ) : <button onClick={create_payment} className='px-10 py-[6px] rounded-sm
        hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>
        Kifizetés indítása</button>
    }
  </div>
 );
};

export default Stripe;
