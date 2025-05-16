import React from 'react';

const ChangePassword = () => {
 return (
  <div className='p-4 bg-white'>
   <h2 className='text-xl text-slate-600 pb-5'>
    Jelszó megváltoztatása
   </h2>
   <form>
    <div className='flex flex-col gap-1 mb-2'>
     <label htmlFor="old_password">Régi jelszó</label>
     <input className='outline-none px-3 py-1 border rounded-md
     text-slate-600' type="password" name="old_password" 
     id="old_password" placeholder='Régi jelszó'/>
    </div>
    <div className='flex flex-col gap-1 mb-2'>
     <label htmlFor="new_password">Új jelszó</label>
     <input className='outline-none px-3 py-1 border rounded-md
     text-slate-600' type="password" name="new_password" 
     id="new_password" placeholder='Új jelszó'/>
    </div>
    <div className='flex flex-col gap-1 mb-2'>
     <label htmlFor="confirm_password">Jelszó megerősítése</label>
     <input className='outline-none px-3 py-1 border rounded-md
     text-slate-600' type="password" name="confirm_password" 
     id="confirm_password" placeholder='Új jelszó mégegyszer'/>
    </div>
    <div>
        <button className='px-8 py-2 bg-[#059473] shadow-lg
        hover:shadow-green-500/30 text-white rounded-md'>
        Jelszó frissítése
        </button>
    </div>
   </form>
  </div>
 );
};

export default ChangePassword;
