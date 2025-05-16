import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { Range } from 'react-range';
import { AiFillStar } from 'react-icons/ai';
import { CiStar } from 'react-icons/ci';
import Products from '../components/products/Products';
import { BsFillGridFill } from 'react-icons/bs';
import { FaThList } from 'react-icons/fa';
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { price_range_product, query_products } from '../store/reducers/homeReducer';

const Shops = () => {
  const dispatch = useDispatch()
  const {products,categorys,priceRange,latest_product,totalProduct,parPage} = useSelector(state => state.home)
  useEffect(() => {
     dispatch(price_range_product())
  },[])
//dinamikus árszűkítés
useEffect(() => { 
  setState({
      values: [priceRange.low, priceRange.high]
  })
},[priceRange])

 const [filter,setFilter] = useState(true)

 //Árszűkítéshez
 const [state, setState] = useState({values: [priceRange.low, priceRange.high]})

// Segédfüggvény az árak formázásához
  const formatPrice = (price) => {
    return new Intl.NumberFormat('hu-HU', {
      useGrouping: true,
      minimumFractionDigits: 0
    }).format(price).replace(/\s/g, '.'); // Szóközök cseréje pontokra
  };
// Értékeléshez
  const [rating, setRating] = useState('')
//rács és listanézethez
  const [styles, setStyles] = useState('grid')
//Lapozáshoz
const [pageNumber, setPageNumber] = useState(1)
//Ár szerinti rendezéshez
const [sortPrice, setSortPrice] = useState('')
//kategóriák beállításához az oldalsávon
const [category, setCategory] = useState('')
const queryCategory = (e, value) => {
  if (e.target.checked) {
      setCategory(value)
  } else {
      setCategory('')
  }
}

useEffect(() => {
  dispatch(
    query_products({
      low: state.values[0],
      high: state.values[1],
      category,
      rating,
      sortPrice,
      pageNumber
    })
  )
},[state.values[0],state.values[1],category,rating,sortPrice,pageNumber])

const resetRating = () => {
    setRating('')
    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        category,
        rating: '',
        sortPrice,
        pageNumber
      })
    )
}

 return (
  <div>
    <Header />
{/*Felső rész kép*/}
    <section className='bg-[url("http://localhost:3000/images/banner/shop.png")]
    h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
    <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
      <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
        <div className='flex flex-col justify-center items-center gap-1
        h-full w-full text-white'>
         <h2 className='text-3xl font-bold'>Vásárlói oldal</h2>
         <div className='flex justify-center items-center gap-2 text-xl w-full'>
            <Link to='/'>Kezdőoldal</Link>
            <span className='pt-1'><IoIosArrowForward /></span>
            <span>Webáruház</span>
         </div>
        </div>
      </div>
    </div>
    </section>
{/*Oldalsáv (kategóriák,árszűrő,értékelő) */}
    <section className='py-16'>
      <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
{/*'Termék szűrése' megjelenítése mobilnézetben*/}
        <div className={`md:block hidden ${!filter ? 'mb-6' : 'mb-0'}`}>
         <button onClick={()=> setFilter(!filter)} className='text-center w-full py-2 px-3
         bg-indigo-500 text-white'>
         Termékek szűrése</button>
        </div>
{/*Kategóriák rész, ha 'Termék szűrésére' kattintunk, akkor bejön mobilnézetben is*/}
        <div className='w-full flex flex-wrap'>
          <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${filter?
          'md:h-0 md:overflow-hidden md:mb-6':'md-hauto md:overflow-auto md:mb-0'} `}>
            <h2 className='text-3xl font-bold mb-3 text-slate-600'>Kategóriák</h2>
{/*Kategóriák megjelenítése oldalsávon*/}
      <div className='py-2'>
        {
        categorys.map((c,i)=> <div key={i}
        className='flex justify-start items-center gap-2 py-1'>
          <input checked={category === c.name ? true : false}
          onChange={(e)=>queryCategory(e,c.name)}
          type="checkbox" id={c.name} />
          <label className='text-slate-600 block cursor-pointer'
            htmlFor={c.name}>{c.name}</label>
        </div>)
        }
      </div>
{/*Árszűrő elhelyezése oldalsávon*/}
        <div className='py-2 flex flex-col gap-5 w-[200px]'>
         <h2 className='text-3xl font-bold mb-3 text-slate-600'>Ár</h2>
         <Range
          step={10}
          min={priceRange.low}
          max={priceRange.high}
          values={(state.values)}
          onChange={(values) => setState({values})}
          renderTrack={({props,children}) => (
            <div {...props} className='w-full h-[6px] bg-slate-200
            rounded-full cursor-pointer'>
                {children}
            </div>
          )}
          renderThumb={({props}) => (
            <div className='w-[15px] h-[15px] bg-[#059473]
            rounded-full' {...props} />
          )}
         />
        <div>
{/*Ár kiírása formatPrice() függvénnyel*/}
<span className='text-slate-800 font-bold text-lg'>{formatPrice(state.values[0])} - {formatPrice(state.values[1])},-Ft

</span>
          </div>
        </div>
{/*Értékelő rész oldalsávon*/}
        <div className='py-3 flex flex-col gap-4'>
          <h2 className='text-3xl font-bold mb-3 text-slate-600'> Értékelés </h2>
          <div className='flex flex-col gap-3'>
            <div onClick={()=> setRating(5)}
            className='text-orange-500 flex justify-start items-start gap-2
            text-xl cursor-pointer'>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
            </div>
            <div onClick={()=> setRating(4)}
            className='text-orange-500 flex justify-start items-start gap-2
            text-xl cursor-pointer'>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
                <span><CiStar/></span>
            </div>
            <div onClick={()=> setRating(3)}
            className='text-orange-500 flex justify-start items-start gap-2
            text-xl cursor-pointer'>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
                <span><CiStar/></span>
                <span><CiStar/></span>
            </div>
            <div onClick={()=> setRating(2)}
            className='text-orange-500 flex justify-start items-start gap-2
            text-xl cursor-pointer'>
                <span><AiFillStar/></span>
                <span><AiFillStar/></span>
                <span><CiStar/></span>
                <span><CiStar/></span>
                <span><CiStar/></span>
            </div>
            <div onClick={()=> setRating(1)}
            className='text-orange-500 flex justify-start items-start gap-2
            text-xl cursor-pointer'>
                <span><AiFillStar/></span>
                <span><CiStar/></span>
                <span><CiStar/></span>
                <span><CiStar/></span>
                <span><CiStar/></span>
            </div>
            <div onClick={resetRating} className='text-orange-500
            flex justify-start items-start gap-2
            text-xl cursor-pointer'>
                <span><CiStar/></span>
                <span><CiStar/></span>
                <span><CiStar/></span>
                <span><CiStar/></span>
                <span><CiStar/></span>
            </div>
          </div>
        </div>
{/*Legújabb termékek oldalsávon csak nagyobb kijelzőkön látszik*/}
        <div className='py-5 flex flex-col gap-4 md:hidden'>
          <Products title='Legújabb termékek' products={latest_product} />
        </div>
        </div>
{/*Szűrő fejléc*/}
         <div className='w-9/12 md-lg:w-8/12 md:w-full'>
          <div className='pl-8 md:pl-0'>
            <div className='py-4 bg-white mb-10 px-3 rounded-md flex
            justify-between items-start border'>
              <h2 className='text-lg font-medium text-slate-600'>({totalProduct}) termék</h2>
        <div className='flex justify-center items-center gap-3'>
        <select onChange={(e)=>setSortPrice(e.target.value)}
          className='p-1 border outline-0 text-slate-600 font-semibold' name="" id="">
          <option value="">Rendezés ár alapján</option>
          <option value="low-to-high">Növekvő</option>
          <option value="high-to-low">Csökkenő</option>
        </select>
        <div className='flex justify-center items-start gap-4 md-lg:hidden'>
          <div onClick={()=> setStyles('grid')}
          className={`p-2 ${styles === 'grid' && 'bg-slate-300'} text-slate-600
          hover:bg-slate-300 cursor-pointer rounded-sm`}>
            <BsFillGridFill/>
          </div>
          <div onClick={()=> setStyles('list')}
          className={`p-2 ${styles === 'list' && 'bg-slate-300'} text-slate-600
          hover:bg-slate-300 cursor-pointer rounded-sm`}>
            <FaThList/>
          </div>
        </div>
        </div>
            </div>
{/*Termékek hozzáadása*/}
    <div className='pb-8'>
        <ShopProducts products={products} styles={styles}/>
    </div>
{/*Termék lapozó rész*/}
{
    <div>
      {
      totalProduct > parPage && 
      <Pagination
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      totalItem={totalProduct}
      parPage={parPage}
      showItem={Math.floor(totalProduct / parPage )}
      />
      }
    </div>
  }
          </div>
         </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
 );
};

export default Shops;