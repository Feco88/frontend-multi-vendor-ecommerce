import React from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ratings}) => {
    return (
    <>
     {
     ratings >= 1 ? <span className='text-[#edbb0e]'><FaStar /></span> :
     ratings >= .5 ? <span className='text-[#edbb0e]'><FaStarHalfAlt /></span>
     : <span className='text-slate-600'><CiStar /></span>
     }
     {
     ratings >= 2 ? <span className='text-[#edbb0e]'><FaStar /></span> :
     ratings >= 1.5 ? <span className='text-[#edbb0e]'><FaStarHalfAlt /></span>
     : <span className='text-slate-600'><CiStar /></span>

     }
     {
     ratings >= 3 ? <span className='text-[#edbb0e]'><FaStar /></span> :
     ratings >= 2.5 ? <span className='text-[#edbb0e]'><FaStarHalfAlt /></span>
     : <span className='text-slate-600'><CiStar /></span>
     }
     {
     ratings >= 4 ? <span className='text-[#edbb0e]'><FaStar /></span> :
     ratings >= 3.5 ? <span className='text-[#edbb0e]'><FaStarHalfAlt /></span>
     : <span className='text-slate-600'><CiStar /></span>
     }
     {
     ratings >= 5 ? <span className='text-[#edbb0e]'><FaStar /></span> :
     ratings >= 4.5 ? <span className='text-[#edbb0e]'><FaStarHalfAlt /></span>
     : <span className='text-slate-600'><CiStar /></span>
     }
    </>
    );
};

export default Rating;
