import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { add_friend, messageClear, send_message, updateMessage } from '../../store/reducers/chatReducer';
import toast from 'react-hot-toast';
import {FaList} from 'react-icons/fa';
import io from 'socket.io-client'
//socket mindig az import-ok után helyezkedik el
const socket = io('http://localhost:5000/')

const Chat = () => {
  const scrollRef = useRef()
  const dispatch = useDispatch()
 //hozzáférés az Eladó azonosítójához
 const {sellerId} = useParams()
 //hozzáférés a bejelentkezett vásárló azonosítójához
 const {userInfo} = useSelector(state => state.auth)
 //hozzáférés a chatReducer-hez
 const {fd_messages,currentFd,my_friends,successMessage} = useSelector(state => state.chat)
 console.log(fd_messages)
 console.log(currentFd)
 //üzenetek megjelenítéséhez
 const [text,setText] = useState('')
 const [receiverMessage,setReceiverMessage] = useState('')
 const [activeSeller, setActiveSeller] = useState([])
 const [show, setShow] = useState(false)

 useEffect(() => {
  //felhasználó hozzáadása a socket-hez
  //(metódusnév,felhasználói azonosító,teljes userInfo)
  socket.emit('add_user',userInfo.id, userInfo)
 },[])

 useEffect(()=>{
  dispatch(add_friend({
    //ha van sellerId, akkor adja át, ha nincs, akkor üres
    sellerId: sellerId || "",
    userId: userInfo.id
  }))
 },[sellerId])

//üzenet elküldése függvény
 const send = () => {
  if (text) {
    dispatch(send_message({
      userId: userInfo.id,
      text,
      sellerId,
      name: userInfo.name
    }))
    setText('')
  }
 }

//eladói üzenetek valósidejű megjelenítése (server.js-ből)
 useEffect(()=>{
  socket.on('seller_message', msg => {
    setReceiverMessage(msg)
  })
  //aktív eladók beállítása
  socket.on('activeSeller', (sellers) => {
    setActiveSeller(sellers)
  })
 },[])

 useEffect(()=>{
  if (successMessage) {
  //legutóbbi üzenet megjelenítése [messages.length -1]
  socket.emit('send_customer_message',fd_messages[fd_messages.length -1])
  dispatch(messageClear())
  }
 },[successMessage])

//értesítés küldése üzenet érkezésekor
  useEffect(() => {
    if (receiverMessage) {
      if (sellerId === receiverMessage.senderId && userInfo.id === receiverMessage.receiverId) {
        dispatch(updateMessage(receiverMessage))
      } else {
        toast.success(receiverMessage.senderName + " " + "Üzenetet küldött neked!")
        dispatch(messageClear())
      }
    }
  },[receiverMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  },[fd_messages])

 return (
 <div className='bg-white p-3 rounded-md'>
  <div className='w-full flex'>

   <div className={`w-[230px] md-lg:absolute bg-white md-lg:h-full -left-[350px]
    ${show ? '-left-0' : '-left-[350px]'}`}>
    <div className='flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]'>
     <span><AiOutlineMessage /></span>
     <span>Beszélgetések</span>
    </div>
   <div className='w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3'>
    {
      my_friends.map((f,i)=>     <Link to={`/dashboard/chat/${f.fdId}`}
      key = {i} className={`flex gap-2 justify-start
      items-center pl-2 py-[5px]`} >
      <div className='w-[30px] h-[30px] rounded-full relative'>
{/*Aktív ikon beállítása chat-ablakhoz */}
    {
      activeSeller.some(c => c.sellerId === f.fdId) && <div 
      className='w-[10px] h-[10px] rounded-full bg-green-500
      absolute right-0 bottom-0'></div>
    }

       <img src={f.image} alt="" />
       </div>
      <span>{f.name}</span>
     </Link>
     )
    }
   </div>
   </div>

  <div className='w-[calc(100%-230px)] md-lg:w-full'>
{/*feltétel megadása a chat-adatok megjelenítéséhez*/}
{
 currentFd ? <div className='w-full h-full'>
 <div className='flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]'>
  <div className='flex gap-2'>
  <div className='w-[30px] h-[30px] rounded-full relative'>
{/*Aktív ikon beállítása chat-ablakhoz */}
    {
     activeSeller.some(c => c.sellerId === currentFd.fdId) && <div 
     className='w-[10px] h-[10px] rounded-full bg-green-500
     absolute right-0 bottom-0'></div>
    }
  <img src={currentFd.image} alt="" />
  </div>
  <span>{currentFd.name}</span>
  </div>
  <div onClick={()=> setShow(!show)} className='w-[35px] h-[35px]
  hidden md-lg:flex cursor-pointer rounded-sm justify-center
  items-center bg-sky-500 text-white'>
    <FaList/>
  </div>
 </div>
 <div className='h-[400px] w-full bg-slate-100 p-3 rounded-md'>
  <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>
  {
    fd_messages.map((m,i) =>{
      if (currentFd?.fdId !== m.receiverId) {
        return(
          <div key={i} ref={scrollRef} className='w-full flex gap-2 justify-start items-center text-[14px]'>
          <img className='w-[30px] h-[30px] ' src="http://localhost:3000/images/user.png" alt="" />
           <div className='p-2 bg-blue-500 text-white rounded-md'>
            <span>{m.message}</span>
           </div>
          </div>
        )
      } else {
        return(
          <div key={i} ref={scrollRef} className='w-full flex gap-2 justify-end items-center text-[14px]'>
          <img className='w-[30px] h-[30px] ' src="http://localhost:3000/images/user.png" alt="" />
           <div className='p-2 bg-red-500 text-white rounded-md'>
            <span>{m.message}</span>
           </div>
         </div>
        )
      }
    })
  }
  </div>
 </div>
 <div className='flex p-2 justify-between items-center w-full'>
  <div className='w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full'>
  <label className='cursor-pointer' htmlFor=""><AiOutlinePlus /></label>
   <input className='hidden' type="file" />
  </div>
{/*beviteli szövegmező*/}
 <div className='border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative'>
   <input value={text} onChange={(e) => setText(e.target.value)} type="text"
   placeholder='Üzenet küldése' className='w-full rounded-full h-full outline-none p-3' />
  <div className='text-2xl right-2 top-2 absolute cursor-auto'>
   <span><GrEmoji /></span>
  </div>
 </div>
{/*küldés gomb*/}
 <div className='w-[40px] p-2 justify-center items-center rounded-full'>
  <div onClick={send} className='text-2xl cursor-pointer'>
  <IoSend />
  </div>
 </div>
 </div>
</div> : <div onClick={() => setShow(true)}
className='w-full h-[400px] flex justify-center items-center
text-lg font-bold text-slate-600'>
 <span>Válaszd ki az Eladót a beszélgetés megkezdéséhez</span>
 </div>    
}

    </div>
  </div>
 </div>
    );
};

export default Chat;
