import React from 'react';
import { FaFacebookF, FaGithub, FaHeart, FaLinkedin } from 'react-icons/fa';
import { FaCartShopping, FaSquareXTwitter } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
  const {userInfo} = useSelector(state => state.auth)
  const {cart_product_count, wishlist_count} = useSelector(state => state.cart)
  const today = new Date();
  const year = today.getFullYear();

 return (
    <footer className='bg-[#f3f6fa]'>
     <div className='w-[85%] flex flex-wrap mx-auto
     border-b py-16 md-lg:pb-10 sm:pb-6'>
{/*Elérhetőségek*/}
      <div className='w-3/12 lg:w-4/12 sm:w-full'>
        <div className='flex flex-col gap-3'>
         <img className='w-[190px] h-[70px]'
         src={`http://localhost:3000/images/logo.png`} alt="logo" />
         <ul className='flex flex-col gap-2 text-slate-600'>
          <li>Cím: 9864. Pajkaszeg, Bazsó u. 13.</li>
          <li>Telefonszám: +36-42-123-456</li>
          <li>E-mail: ugyfelszolgalat@fecashop.com</li>
         </ul>
        </div>
      </div>
{/*Hasznos linkek */}
      <div className='w-5/12 lg:w-8/12 sm:w-full'>
        <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
         <div>
            <h2 className='font-bold text-lg mb-2'>Hasznos hivatkozások</h2>
            <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
             <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
              <li>
                <Link>Rólunk</Link>
              </li>
              <li>
                <Link>Boltunkról</Link>
              </li>
              <li>
                <Link>Szállítási információk</Link>
              </li>
              <li>
                <Link>Adatvédelmi Nyilatkozat</Link>
              </li>
              <li>
                <Link>Blog</Link>
              </li>
             </ul>
             <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
              <li>
                <Link>Szolgáltatások</Link>
              </li>
              <li>
                <Link>Cégprofil</Link>
              </li>
              <li>
                <Link>Kapcsolat</Link>
              </li>
              <li>
                <Link>ÁSZF</Link>
              </li>
              <li>
                <Link>Üzleteink</Link>
              </li>
             </ul>
            </div>
         </div>
        </div>
      </div>
{/*Hírlevél - feliratkozás*/}
    <div className='w-4/12 lg:w-full lg:mt-6'>
     <div className='w-full flex flex-col justify-start gap-5'>
      <h2 className='font-bold text-lg mb-2'>Csatlakozz webáruházunkhoz</h2>
      <span>Kapj email értesítést legújabb termékeinkről és különleges ajánlatainkról</span>
       <div className='h-[50px] w-full bg-white border relative'>
        <input className='h-full bg-transparent w-full px-3 outline-0'
        type="text" placeholder='E-mail cím megadása' />
        <button className='h-full absolute right-0 bg-[#059473] text-white
        uppercase px-4 font-bold text-sm'>Feliratkozás</button>
       </div>
{/*Közösségi hivatkozások*/}
        <ul className='flex justify-start items-center gap-3'>
         <li>
            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white
            flex justify-center items-center bg-white rounded-full'
            href='https://www.facebook.com/hamvai.ferenc/'><FaFacebookF /></a>
         </li>
         <li>
            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white
            flex justify-center items-center bg-white rounded-full'
            href='https://www.facebook.com/hamvai.ferenc/'><FaSquareXTwitter /></a>
         </li>
         <li>
            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white
            flex justify-center items-center bg-white rounded-full'
            href='https://www.linkedin.com/in/ferenc-hamvai-34552331a'><FaLinkedin/></a>
         </li>
         <li>
            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white
            flex justify-center items-center bg-white rounded-full'
            href='https://github.com/Feco88'><FaGithub /></a>
         </li>
        </ul>

     </div>
    </div>
     </div>
{/*Copyright*/}
    <div className='w-[90%] flex flex-wrap justify-center items-center text-slate-600
    mx-auto py-5 text-center'>
        <span>Copyright © {year} Minden jog fenntartva</span>
    </div>
{/*Kosár és Kedvencek ikon megjelenítése mobilnézetben*/}
  <div className='hidden fixed md-lg:block w-[50px] h-[110px] bottom-3 right-2
  bg-white rounded-full p-2'>
    <div className='w-full h-full flex gap-3 flex-col justify-center items-center'>
     <div onClick={() => navigate(userInfo ? '/cart' : '/login')}
     className='relative flex justify-center items-center cursor-pointer
     w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
      <span className='text-xl text-green-500'><FaCartShopping /></span>
      {
        cart_product_count !== 0 && <div className='w-[20px] h-[20px]
        absolute bg-red-500 rounded-full text-white flex
        justify-center items-center -top-[6px] -right-[7px]'>
          {
            cart_product_count
          }
        </div>
      }
     </div>

     <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')}
     className='relative flex justify-center items-center cursor-pointer
     w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
      <span className='text-xl text-green-500'><FaHeart /></span>
      {
        wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute
        bg-red-500 rounded-full text-white flex justify-center 
        items-center -top-[6px] -right-[7px]'>
          {
            wishlist_count
          }
        </div>
      }

     </div>
    </div>
  </div>

    </footer>
 );
};

export default Footer;