import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get_order_details } from '../../store/reducers/orderReducer';

const OrderDetails = () => {
 const {orderId} = useParams()
 const dispatch = useDispatch()
 const {userInfo} = useSelector(state => state.auth)
 const {myOrder} = useSelector(state => state.order)
 useEffect(() => {
    dispatch(get_order_details(orderId))
 },[orderId])

 return (
  <div className='bg-white p-5'>
{/*Szállítási infók kiíratása */}
   <h2 className='text-slate-600 font-semibold'>Rendelésszám: #{myOrder._id}
   {/*<span className='pl-1'>{myOrder.date}</span>*/}</h2>
    <div className='grid grid-cols-2 gap-3 py-4'>
     <div className='flex flex-col gap-1'>
    <h2 className='text-slate-600 font-semibold font-sans'>
     Szállítási információk: {myOrder.shippingInfo?.name} </h2>
     <p>
      <span className='bg-blue-100 text-blue-800 text-sm
      font-medium mr-2 px-2 py-2 rounded'>Otthoni cím</span>
      <span className='text-slate-600 text-sm'>
        {myOrder.shippingInfo?.province}.{` `}
        {myOrder.shippingInfo?.city},{` `}
        {myOrder.shippingInfo?.address}{` `}
        Telefon-/Mobilszám: {myOrder.shippingInfo?.phone}
      </span>
     </p>
     <p className='text-slate-700 text-md font-semibold'>
        Email kiküldve {userInfo.email} részére.
     </p>
     </div>
{/*Fizetési/rendelési állapotok kiíratása*/}
  <div className='text-slate-600'>
  <h2 className='font-mono'>Bruttó végösszeg: {myOrder.price},-Ft,
   amely tartalmazza a szállítási költséget.</h2>
  <p className='font-mono'>
    Fizetés állapota: <span className={`py-[1] text-xs px-3
        ${myOrder.payment_status === 'fizetve'? 'bg-green-300 text-green-800':
        'bg-red-300 text-red-800'} rounded-md`}>{myOrder.payment_status}
    </span>
  </p>
  <p className='font-mono'>
    Rendelés állapota: <span className={`py-[1] text-xs px-3
        ${myOrder.delivery_status === 'fizetve'? 'bg-green-300 text-green-800':
        'bg-red-300 text-red-800'} rounded-md`}>{myOrder.delivery_status}
    </span>
  </p>
  </div>
  </div>
{/*Adott rendelésben található termékadatok kiíratása*/}
  <div className='mt-4'>
   <h2 className='text-slate-600 text-lg pb-2 font-sans font-bold'>
    Megrendelt termékek</h2>
   <div className='flex gap-5 flex-col'>
    {
     myOrder.products?.map((p,i)=> <div key={i}>
      <div className='flex gap-5 justify-start items-center text-slate-600'>
       <div className='flex gap-2'>
        <img className='w-[200px] h-[200px] object-contain' src={p.images[0]} alt="" />
        <div className='flex text-sm flex-col justify-start items-start'>
         <Link>{p.name}</Link>
         <p><span>Gyártó: {p.brand}</span></p>
         <p><span>Rendelt mennyiség: {p.quantity}</span></p>
        </div>
       </div>
{/*Termék árának megjelenítése*/}
       <div className='pl-4 flex flex-col'>
        <h2 className='text-md text-green-800'>
         {p.price - Math.floor((p.price * p.discount) / 100)},-Ft
        </h2>
        <p className='line-through'>{p.price}</p>
        <p>{p.discount}%</p>
       </div>

      </div>
     </div>
     )
    }
   </div>
  </div>


  </div>
 );
};
export default OrderDetails;
