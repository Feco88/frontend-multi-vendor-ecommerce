/*
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

//hozzáadás a beszélgetéshez metódus
export const add_friend = createAsyncThunk(
 'chat/add_friend',
   async(info, { rejectWithValue,fulfillWithValue }) => {
    try {
     const {data} = await api.post('/chat/customer/add-customer-friend',info)
     //console.log(data)
     return fulfillWithValue(data)
    } catch (error) {
       return rejectWithValue(error.response.data)
    }
   }
)
//hozzáadás a beszélgetéshez metódus vége
//üzenet küldése metódus
export const send_message = createAsyncThunk(
    'chat/send_message',
      async(info, { rejectWithValue,fulfillWithValue }) => {
       try {
        const {data} = await api.post('/chat/customer/send-message-to-seller',info)
       // console.log(data)
         return fulfillWithValue(data)
       } catch (error) {
          return rejectWithValue(error.response.data)
       }
      }
   )
//üzenet küldése metódus vége

export const chatReducer = createSlice({
   name: 'chat',
   initialState:{
    //eladó
    my_friends: [],
    //ismerősök
    fd_messages: [],
    //jelenlegi ismerős
    currentFd: "",
    errorMessage: '',
    successMessage: '',
   },
 reducers : {
   messageClear : (state,_) => {
    state.errorMessage = ""
    state.successMessage = ""
   },
   updateMessage: (state, {payload}) => {
    state.fd_messages = [...state.fd_messages,payload]
   }
 },
 extraReducers: (builder) => {
    builder 
    .addCase(add_friend.fulfilled, (state, { payload }) => { 
        state.fd_messages = payload.messages;
        state.currentFd = payload.currentFd;
        state.my_friends = payload.MyFriends;
    })
    .addCase(send_message.fulfilled, (state, { payload }) => { 
    //indexáljuk vissza a myFriends[]-t
        let tempFriends = state.my_friends
        let index = tempFriends.findIndex(f => f.fdId === payload.message.receiverId)
        while (index > 0) {
            let temp = tempFriends[index]
            tempFriends[index] = tempFriends[index - 1]
            tempFriends[index - 1] = temp
            index--
        }
        state.my_friends = tempFriends;
        state.fd_messages = [...state.fd_messages, payload.message];
        state.successMessage = 'Üzenet sikeresen elküldve!';
    })
}
})
export const {messageClear,updateMessage} = chatReducer.actions
export default chatReducer.reducer
*/
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const add_friend = createAsyncThunk(
    'chat/add_friend',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/chat/customer/add-customer-friend',info)
           // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const send_message = createAsyncThunk(
    'chat/send_message',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/chat/customer/send-message-to-seller',info)
            //  console.log(data)
             return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

 


export const chatReducer = createSlice({
    name: 'chat',
    initialState:{
        my_friends: [],
        fd_messages : [],
        currentFd: "",
        errorMessage : '',
        successMessage: '', 
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        updateMessage: (state, {payload}) => {
            state.fd_messages = [...state.fd_messages, payload]
        }
  
    },
    extraReducers: (builder) => {
        builder 
        .addCase(add_friend.fulfilled, (state, { payload }) => { 
            state.fd_messages = payload.messages;
            state.currentFd = payload.currentFd;
            state.my_friends = payload.MyFriends;
        })
        .addCase(send_message.fulfilled, (state, { payload }) => { 
            let tempFriends = state.my_friends
            let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId)
            while (index > 0) {
                let temp = tempFriends[index]
                tempFriends[index] = tempFriends[index - 1]
                tempFriends[index - 1] = temp
                index--
            }            
            state.my_friends = tempFriends;
            state.fd_messages = [...state.fd_messages, payload.message];
            state.successMessage = 'Üzenet küldése sikeres';
        })

       
    }
})
export const {messageClear,updateMessage} = chatReducer.actions
export default chatReducer.reducer