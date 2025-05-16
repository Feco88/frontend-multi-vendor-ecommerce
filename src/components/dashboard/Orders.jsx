import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { get_orders } from '../../store/reducers/orderReducer';

const Orders = () => {
 const [state,setState] = useState('mind')
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const {orderId} = useParams()
 const {userInfo} = useSelector(state => state.auth)
 const {myOrders} = useSelector(state => state.order)

 useEffect(() => {
  dispatch(get_orders({status:state, customerId:userInfo.id}))
 },[state])

 const redirect = (ord) => {
  let items = 0;
  for (let i = 0; i < ord.length; i++) {
    items = ord.products[i].quantity + items;
  }
  navigate('/payment',{
    state: {
      price: ord.price,
      items,
      orderId: ord._id
    }
  })
}

 return (
  <div className='bg-white p-4 rounded-md'>
   <div className='flex justify-between items-center'>
    <h2 className='text-xl font-semibold text-slate-600'>
     Rendeléseim
    </h2>
    <select className='outline-none px-3 py-1 border
    rounded-md text-slate-600' value={state}
    onChange={(e) => setState(e.target.value) }>
     <option value="mind">Rendelés állapota</option>
     <option value="kiszállítva">Kiszállítva</option>
     <option value="függőben">Függőben</option>
     <option value="törölve">Törölve</option>
     <option value="raktárban">Raktárban</option>
    </select>
   </div>
{/*Táblázat*/}
 <div className='pt-4'>
  <div className='relative overflow-x-auto rounded-md'>
   <table className='w-full text-sm text-left text-gray-500'>
    <thead className='text-xs text-gray-700 uppercase
    bg-gray-200'>
     <tr>
      <th scope='col' className='px-6 py-3'>Megrendelésszám</th>
      <th scope='col' className='px-6 py-3'>Bruttó ár</th>
      <th scope='col' className='px-6 py-3'>Fizetés állapota</th>
      <th scope='col' className='px-6 py-3'>Megrendelés állapota</th>
      <th scope='col' className='px-6 py-3'>Műveletek</th>
     </tr>
    </thead>
    <tbody>
  {
  myOrders.map((o,i) => 
    <tr className='bg-white border-b'>
    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
      #{o._id}</td>
    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
      {o.price},-Ft</td>
    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
      {o.payment_status}</td>
    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
      {o.delivery_status}</td>
    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
      <Link to={`/dashboard/order/details/${o._id}`}>
    <span className='bg-green-200 text-green-800 text-md
      font-semibold mr-2 px-3 py-[2px] rounded'>
      Megtekintés</span></Link>
  {
    o.payment_status !== 'fizetve' && <span onClick={()=> redirect(o)}
    className='bg-green-200 text-green-800 text-md
    font-semibold mr-2 px-3 py-[2px] rounded cursor-pointer'>
    Fizetés</span>
  }
   </td>
  </tr>
   )
  }
  </tbody>
  </table>
    </div>
   </div>
  </div>
  );
};

export default Orders;
