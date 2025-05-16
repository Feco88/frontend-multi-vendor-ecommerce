import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { get_cart_products,
         delete_cart_product,
         messageClear,
         quantity_inc,
         quantity_dec }
from '../store/reducers/cartReducer';
import toast from 'react-hot-toast';

const Cart = () => {

  const dispatch = useDispatch()
//auth Reducer-rel megkapjuk a
//felhasználóhoz tartozó adatokat
  const {userInfo} = useSelector(state => state.auth)
  const {cart_products,successMessage,price,buy_product_item,
  shipping_fee,outofstock_products} = useSelector(state => state.cart)

  const navigate = useNavigate()

//dispatch() függvényben lekérjük a felhasználói azonosítót
  useEffect(() => {
    dispatch(get_cart_products(userInfo.id))
  },[])
//Termékadatok átadása a megrendelői oldalnak
  const redirect = () => {
    navigate('/shipping',{
     state: {
      products: cart_products,
      price: price,
      shipping_fee: shipping_fee,
      items: buy_product_item
    }
   })
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear())
      dispatch(get_cart_products(userInfo.id))
    }
 },[successMessage])
//termék mennyiségének növelése kosárban
 const inc = (quantity, stock, cart_id) => {
  const temp = quantity + 1;
  if (temp <= stock) {
    dispatch(quantity_inc(cart_id))
  }
 }
 //termék mennyiségének csökkentése kosárban
 const dec = (quantity, cart_id) => {
  const temp = quantity - 1;
  if (temp !== 0) {
    dispatch(quantity_dec(cart_id))
  }
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
      <h2 className='text-3xl font-bold'>Kosár</h2>
        <div className='flex justify-center items-center gap-2 text-xl w-full'>
        <Link to='/'>Kezdőoldal</Link>
        <span className='pt-1'><IoIosArrowForward /></span>
        <span>Kosár</span>
         </div>
    </div>
    </div>
  </div>
</section>

<section className='bg-[#eee]'>
 <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w[90%] mx-auto py-16'>
{/*Készleten lévő termékek megjelenítése*/}
    {
    cart_products.length > 0 || outofstock_products > 0 ? <div className='flex flex-wrap'>
     <div className='w-[67%] md-lg:w-full'>
      <div className='pr-3 md-lg:pr-0'>
       <div className='flex flex-col gap-3'>
        <div className='bg-white p-4'>
            <h2 className='text-md text-green-500 font-semibold'>
             ({cart_products.length}) Eladó terméke található a kosárban
            </h2>
        </div>
    {
      cart_products.map((p,i) => <div className='flex bg-white p-4 flex-col gap-2'>
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
{/*Mennyiség hozzáadása/eltávolítása*/}
  <div className='flex gap-2 flex-col'>
   <div className='flex bg-slate-200 h-[30px] justify-center
   items-center text-xl'>
    <div onClick={() => dec(pt.quantity,pt._id)}
    className='px-3 cursor-pointer'>-</div>
    <div className='px-3 cursor-pointer'>{pt.quantity}</div>
    <div onClick={() => inc(pt.quantity,pt.productInfo.stock,pt._id)}
    className='px-3 cursor-pointer'>+</div>
    </div>
     <button onClick={() => dispatch(delete_cart_product(pt._id))}
     className='px-5 py-[3px] bg-red-500 text-white'>Törlés</button>
    </div>
   </div>
  </div>)
  }
 </div>)
  }
{/*Kifogyott termékek megjelenítése*/}
  {
   outofstock_products.length > 0 && <div className='flex flex-col gap-3'>
    <div className='bg-white p-4'>
     <h2 className='text-md text-red-500 font-semibold'>
      ({outofstock_products.length}) termék elfogyott
     </h2>
    </div>
    <div className='bg-white p-4'>
  {    
   outofstock_products.map((p,i) => <div className='w-full flex flex-wrap'>
    <div className='flex sm:w-full gap-2 w-7/12'>
     <div className='flex gap-2 justify-start items-center'>
      <img className='w-[80px] h-[80px]'
      src={p.products[0].images[0]} alt="" />
       <div className='pr-4 text-slate-600'>
        <h2 className='text-md font-semibold'>{p.products[0].name}</h2>
        <span className='text-sm'>Gyártó: {p.products[0].brand}</span>
       </div>
     </div>
    </div>
    <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
      <div className='pl-4 sm:pl-0'>
       <h2 className='text-lg text-orange-500'>
        {p.products[0].price-Math.floor((p.products[0].price*p.products[0].discount)/100)},-Ft</h2>
       <p className='line-through'>{p.products[0].price},-Ft</p>
       <p>-{p.products[0].discount}%</p>
      </div>
{/*Mennyiség hozzáadása/eltávolítása kifogyott termék esetén*/}
     <div className='flex gap-2 flex-col'>
      <div className='flex bg-slate-200 h-[30px] justify-center
      items-center text-xl'>
      <div  onClick={() => dec(p.quantity,p._id)}
      className='px-3 cursor-pointer'>-</div>
      <div className='px-3 cursor-pointer'>{p.quantity}</div>
      <div className='px-3 cursor-pointer'>+</div>
      </div>
        <button onClick={() => dispatch(delete_cart_product(p._id))}
        className='px-5 py-[3px] bg-red-500 text-white'>
        Törlés</button>
     </div>
    </div>
       </div>)
       
          }
        </div>
      </div>
    }
       </div>
      </div>
     </div>
{/*Kosár - megrendelés összesítő rész*/}
 <div className='w-[33%] md-lg:w-full'>
  <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
  {
   cart_products.length > 0 && <div className='bg-white p-3
   text-slate-600 flex flex-col gap-3'>
     <h2 className='text-xl font-bold'>Megrendelés összesítő</h2>
      <div className='flex justify-between items-center'>
      <span>{buy_product_item} Termék</span>
      <span>{price},-Ft</span>
      </div>
      <div className='flex justify-between items-center'>
      <span>Szállítási díj</span>
      <span>{shipping_fee},-Ft</span>
      </div>
     <div className='flex gap-2'>
      <input className='w-full px-3 py-2 border border-slate-200
       outline-0 focus:border-green-500 rounded-sm'
       type="text" placeholder='Kuponkód'/>
      <button className='px-5 py-[1px] bg-[#059473] text-white
      rounded-sm uppercase text-sm'>Érvényesít</button>
     </div>
      <div className='flex justify-between items-center'>
      <span>Összesen:</span>
      <span className='text-lg text-[#059473]'>{price + shipping_fee},-Ft</span>
      </div>
       <button onClick={redirect} className='px-5 py-[6px] rounded-sm
        hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm
        text-white uppercase'>
        Vásárlás folytatása ({buy_product_item})
       </button>
       </div>
      }
    </div>
  </div>
    </div>
    : <div>
    <Link className='px-4 py-1 bg-blue-500 text-white' to='/shops'>
    Ugrás a webáruházhoz
    </Link>
      </div>
      }
 </div>
</section>
 <Footer/>
</div>
    );
};

export default Cart;