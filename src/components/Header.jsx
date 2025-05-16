import React, { useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { IoIosArrowDown, IoMdPhonePortrait } from "react-icons/io";
import { FaFacebookF, FaLinkedin, FaGithub,
         FaUser, FaLock, FaList, 
         FaHeart, FaPhoneAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaCartShopping } from 'react-icons/fa6';
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_cart_products, get_wishlist_products } from '../store/reducers/cartReducer';

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {categorys} = useSelector(state => state.home)
    const {userInfo} = useSelector(state => state.auth)
    const {cart_product_count, wishlist_count} = useSelector(state => state.cart)
  //elérési útvonalakhoz menünél
  const {pathname} = useLocation()
  //menüsor kinyitása/elrejtése közepes alatti kijelzőkön
  const [showSidebar, setShowSidebar] = useState(true)
  //kategóriák megjelenítése
  const [categoryShow, setCategoryShow] = useState(true)
  //felhasználó beállítása igaz értékre, hogy ezt mutassa jobb felül
  // eslint-disable-next-line
  const user = false
//keresés beállítása kategóriákhoz fejlécben
  const [searchValue, setSearchValue] = useState('')
  const [category, setCategory] = useState('')
  //keresés dinamikusan kategóriákban
  const search = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`)
  }
//ha a felhasználó be van lépve, akkor irányítsa a Kosárhoz,
//ha nincs bejelentkezve, akkor a login oldalra
  const redirect_cart_page = () => {
    if (userInfo) {
      navigate('/cart')
    } else {
      navigate('/login')
    }
  }

//hívjuk meg a két metódust, ha be van jelentkezve a vásárló
//ekkor a kosár és a kedvencek ikon-nál megjelenik a tényleges információ
useEffect(() => {
  if (userInfo) {
    dispatch(get_cart_products(userInfo.id))
    dispatch(get_wishlist_products(userInfo.id))
  }
},[userInfo])

    return (
    <div className='w-full bg-white'>
{/*Fejléc felső rész elkészítése*/}
        <div className='header-top bg-[#caddff] md-lg:hidden'>
         <div className='w-[85%] lg:w-[90%] mx-auto'>
          <div className='flex w-full justify-between items-center
            h-[50px] text-slate-500'>
            <ul className='flex justify-start items-center gap-8
            font-semibold text-black'>
              <li className='flex relative justify-center items-center
                gap-2 text-sm after:absolute after:h-[18px] after:w-[1px]
                after:bg-[#afafaf] after:-right-[16px]'>
                <span><MdEmail /></span>
                <span>ugyfelszolgalat@fecashop.com</span>
              </li>
              <li className='flex relative justify-center items-center
                gap-2 text-sm'>
                <span><IoMdPhonePortrait /></span>
                <span>+36-30/123-4567</span>
              </li>
            </ul>
            <div>
             <div className='flex justify-center items-center gap-10'>
{/*Közösségi oldal menüpont ikonok*/}
              <div className='flex justify-center items-center gap-4 text-black'>
                <a href='https://www.facebook.com/hamvai.ferenc/'><FaFacebookF /></a>
                <a href='https://www.facebook.com/hamvai.ferenc/'><FaSquareXTwitter /></a>
                <a href='https://www.linkedin.com/in/ferenc-hamvai-34552331a'><FaLinkedin /></a>
                <a href='https://github.com/Feco88'><FaGithub /></a>
              </div>
{/*Nyelv választó menüpont*/}
              <div className='flex group cursor-pointer text-slate-800 text-sm
              justify-center items-center gap-1 relative after:h-[18px] after:w-[1px]
              after:bg-[#afafaf] after:-right-[14px] after:absolute before:absolute
              before:h-[18px] before:w-[1px] before:bg-[#afafaf] before:left-[-12px]'>
                <img src="http://localhost:3000/images/language.png" alt='' />
                <span><IoMdArrowDropdown/></span>
                <ul className='absolute invisible transition-all top-12 rounded-sm
                duration-200 text-white p-2 w-[100px] flex flex-col gap-3
                group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                <li>Angol</li>
                <li>Német</li>
                </ul>
              </div>
{/*Bejelentkező oldal menüpont*/}
  {
    userInfo ? <Link className='flex cursor-pointer justify-center
    items-center gap-2 text-sm text-black' to='/dashboard'>
      <span><FaUser /></span>
      <span>{userInfo.name}</span>
    </Link> : <Link to='/login'
    className='flex cursor-pointer justify-center items-center
    gap-2 text-sm text-black'>
      <span><FaLock /></span>
      <span>Bejelentkezés</span>
    </Link> 
  }
          </div>
         </div>
       </div>
     </div>
   </div>
{/*Fejléc 2. része (logo, menü, kedvencek, kosár, oldalsáv)*/}
    <div className='w-white'>
     <div className='w-[85%] lg:w-[90%] mx-auto'>
      <div className='h-[80px] md-lg:h-[100px] flex justify-between
      items-center flex-wrap'>
      <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
       <div className='flex justify-between items-center'>
{/*Logó (FecaShop) */}
        <Link to='/'>
         <img src='http://localhost:3000/images/logo.png' alt='' />
        </Link>
{/*Menü elrejtése közepes- és kisméretű kijelzőkön*/}
        <div className='justify-center items-center w-[30px] h-[30px]
        bg-white text-slate-600 border border-slate-600
        rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden'
        onClick={()=> setShowSidebar(false)}>
            <span><FaList /></span>
        </div>
       </div>
      </div>
{/*Menü*/}
    <div className='md:lg:w-full w-9/12'>
     <div className='flex justify-between md-lg:justify-center
     items-center flex-wrap pl-8'>
        <ul className='flex justify-start items-start gap-8
        text-sm font-bold uppercase md-lg:hidden'>
            <li>
                <Link to='/' className={`p-2 block ${pathname === '/' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Kezdőoldal</Link>
            </li>
            <li>
                <Link to='/shops' className={`p-2 block ${pathname === '/shops' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Webáruház</Link>
            </li>
            <li>
                <Link className={`p-2 block ${pathname === '/blog' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Blog</Link>
            </li>
            <li>
                <Link className={`p-2 block ${pathname === '/about' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Rólunk</Link>
            </li>
            <li>
                <Link className={`p-2 block ${pathname === '/contact' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Kapcsolat</Link>
            </li>
        </ul>
{/*Értesítések (kívánságlista és kosár)*/}
 <div className='flex md-lg:hidden justify-center items-center gap-5'>
  <div className='flex justify-center gap-5'>
  <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')}
    className='relative flex justify-center items-center
    cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
     <span className='text-xl text-green-500'><FaHeart /></span>
    {
      wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute
    bg-red-500 rounded-full text-white flex justify-center
      items-center -top-[3px] -right-[5px]'>
      {wishlist_count}
      </div>
    }
  </div>
 <div onClick={redirect_cart_page} className='relative flex justify-center items-center
  cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
   <span className='text-xl text-green-500'><FaCartShopping /></span>
    {
     cart_product_count !== 0 && <div className='w-[20px] h-[20px]
     absolute bg-red-500 rounded-full text-white flex
     justify-center items-center -top-[3px] -right-[5px]'>
      {
        cart_product_count
      }
      </div>
    }
        </div>
       </div>
      </div>
     </div>
    </div>
      </div>
     </div>
    </div>
{/*Oldalsáv megjelenítése közepes képernyőméret (991px) alatt*/}
<div className='hidden md-lg:block'>
 <div onClick={()=>setShowSidebar(true)} className={`fixed
 duration-200 transition-all ${showSidebar ? 'invisible' :
 'visible'} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)]
 top-0 left-0 z-20`}>
 </div>
 <div className={`w-[300px] z-[9999] transition-all duration-200
        fixed ${showSidebar ? '-left-[300px]' : 'left-0 top-0'}
        overflow-y-auto bg-white h-screen py-6 px-8}`}>
         <div className='flex justify-start flex-col gap-6 px-4'>
{/*Logó megjelenítése oldalsávon*/}
         <Link to='/'>
         <img src='http://localhost:3000/images/logo.png' alt='' />
         </Link>
{/*Nyelv megjelenítése oldalsávon*/}
         <div className='flex justify-start items-center gap-10'>
         <div className='flex group cursor-pointer text-slate-800 text-sm
              justify-center items-center gap-1 relative after:h-[18px] after:w-[1px]
              after:bg-[#afafaf] after:-right-[14px] after:absolute'>
                <img src="http://localhost:3000/images/language.png" alt='' />
                <span><IoMdArrowDropdown/></span>
                <ul className='absolute invisible transition-all top-12 rounded-sm
                duration-200 text-white p-2 w-[100px] flex flex-col gap-3
                group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                <li>Angol</li>
                <li>Német</li>
                </ul>
         </div>
{/*Felhasználói bejelentkezés oldalsávon*/}
         {
          userInfo ? <Link className='flex cursor-pointer justify-center items-center
           gap-2 text-sm text-black' to='/dashboard'>
            <span><FaUser /></span>
            <span>{userInfo.name}</span>
          </Link> : <Link className='flex cursor-pointer justify-center items-center
           gap-2 text-sm text-black' to='/login'>
              <span><FaLock /></span>
              <span>Bejelentkezés</span>
          </Link> 
              }  
         </div>
{/*Menü megjelenítése az oldalsávon*/}
         <ul className='flex flex-col justify-start items-start text-sm font-bold
         uppercase'>
            <li>
                <Link to='/' className={`py-2 block ${pathname === '/' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Kezdőoldal</Link>
            </li>
            <li>
                <Link  to='/shops' className={`py-2 block ${pathname === '/shops' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Webáruház</Link>
            </li>
            <li>
                <Link className={`py-2 block ${pathname === '/blog' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Blog</Link>
            </li>
            <li>
                <Link className={`py-2 block ${pathname === '/about' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Rólunk</Link>
            </li>
            <li>
                <Link className={`py-2 block ${pathname === '/contact' ? 'text-[#059473]'
                    : 'text-slate-600' } `} >Kapcsolat</Link>
            </li>
        </ul>
{/*Közösségi ikonok megjelenítése az oldalsávon*/}
        <div className='flex justify-start items-center gap-4 text-black'>
                <a href='https://www.facebook.com/hamvai.ferenc/'><FaFacebookF /></a>
                <a href='https://www.facebook.com/hamvai.ferenc/'><FaSquareXTwitter /></a>
                <a href='https://www.linkedin.com/in/ferenc-hamvai-34552331a'><FaLinkedin /></a>
                <a href='https://github.com/Feco88'><FaGithub /></a>
        </div>
{/*Telefonos ügyfélszolgálat oldalsávon*/}
        <div className='w-full flex justify-end md-lg:justify-start px-2 gap-3 items-center'>
         <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5]
         justify-center items-center'>
           <span><FaPhoneAlt /></span>
         </div>
         <div className='flex justify-end flex-col gap-1'>
          <h2 className='text-sm font-medium text-slate-700'>+36-30/123-4567</h2>
          <span className='text-xs'>Ügyfélszolgálat 0-24</span>
         </div>
        </div>
        
        <ul className='flex flex-col justify-start items-start gap-3 text-[#1c1c1c]'>
         <li className='flex justify-start items-center gap-2 text-sm'>
          <span><MdEmail /></span>
          <span>ugyfelszolgalat@fecashop.com</span>
         </li>
        </ul>

         </div>
    </div>
</div>
{/*Fejléc 3. részének elkészítése (kategóriák, keresőmező, ügyfélszolgálat) */}
    <div className='w-[85%] lg:w-[90%] mx-auto'>
     <div className='flex w-full flex-wrap md-lg:gap-8'>
{/*Kategóriák*/}
        <div className='w-3/12 md-lg:w-full'>
         <div className='bg-white relative'>
          <div onClick={()=>setCategoryShow(!categoryShow)} 
          className='h-[50px] bg-[#059473] text-white
          flex justify-center md-lg:justify-between md-lg:px-6
          items-center gap-3 font-bold text-md cursor-pointer'>
            <div className='flex justify-center items-center gap-3'>
             <span><FaList /></span>
             <span>Kategóriák</span>
            </div>
            <span className='pt-1'><IoIosArrowDown /></span>
          </div>
         </div>
         {/*kategóriák menüpont magassága h-[400px]-ről átállítva*/}
        <div className={`${categoryShow ? 'h-0' : 'h-auto'}
        overflow-hidden transition-all md-lg:relative duration-500 absolute
        z-[9999] bg-[#dbf3ed] w-[270px] border-x`}>
            <ul className='py-2 text-slate-600 font-medium'>
            {
             categorys.map((c,i)=>{
              return (
                <li key={i} className='flex justify-start items-center
                gap-2 px-[24px] py-[6px]'>
                <img className='w-[30px] h-[30px]
                rounded-full overflow-hidden' src={c.image} alt="" />
                <Link to={`/products?category=${c.name}`}
                className='text-sm block'>{c.name}</Link>
                </li>
               )
             })
            }
            </ul>
        </div>
        </div>
{/*Keresés kategóriákban*/}
      <div className='w-9/12 pl-8 md-lg:pl-0 md-lg:w-full'>
       <div className='flex flex-wrap w-full justify-between
       items-center md-lg:gap-6'>
        <div className='w-8/12 md-lg:w-full'>
         <div className='flex border h-[50px] items-center relative gap-6'>
            <div className='relative after:absolute after:h-[25px] after:w-[1px]
            after:bg-[#afafaf] after:-right-[15px] md:hidden'>
      <select onChange={(e)=> setCategory(e.target.value)}
        className='w-[160px] text-slate-600 font-semibold
        bg-[#fff] px-2 h-full outline-0 border-none' name="" id="">
          <option value="">Válassz kategóriát</option>
          {
          categorys.map((c,i) => <option key={i}
            value={c.name}>{c.name} </option> )
          }
            </select>
            </div>
            <input className='relative bg-transparent text-slate-500
            outline-0 px-3 h-full w-full'
            onChange={(e)=> setSearchValue(e.target.value)}
            type="text" name='' id='' placeholder='Keress örömmel nálunk...'/>
{/*Keresés gomb*/}
            <button onClick={search}
            className='bg-[#059473] right-0 px-8 h-full font-semibold
            uppercase text-white'>Keresés</button>
         </div>
        </div>
{/*Ügyfélszolgálat ikon és szám a keresőmező mellett */}
        <div className='w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0'>
        <div className='w-full flex justify-end md-lg:justify-start px-2 gap-3 items-center'>
         <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5]
         justify-center items-center'>
           <span><FaPhoneAlt /></span>
         </div>
         <div className='flex justify-end flex-col gap-1'>
          <h2 className='text-md font-medium text-slate-700'>+36-30/123-4567</h2>
          <span className='text-sm'>Ügyfélszolgálat 0-24</span>
         </div>
        </div>
        </div>
       </div>
      </div>
     </div>
    </div>
</div>
    );
};

export default Header;
