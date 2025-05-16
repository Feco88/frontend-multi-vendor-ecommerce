import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

//Termék hozzáadása kosárhoz metódus
export const add_to_cart = createAsyncThunk(
 'cart/add_to_cart',
    async(info, { rejectWithValue,fulfillWithValue }) => {
    try {
     const {data} = await api.post('/home/product/add-to-cart',info)
     //console.log(data)
     return fulfillWithValue(data)
    } catch (error) {
     return rejectWithValue(error.response.data)
    }
  }
)
//Termék hozzáadása kosárhoz metódus vége
//Termék megjelenítése kosárban metódus
export const get_cart_products = createAsyncThunk(
  'cart/get_cart_products',
     async(userId, { rejectWithValue,fulfillWithValue }) => {
     try {
    const {data} = await api.get(`/home/product/get-cart-product/${userId}`)
      //console.log(data)
      return fulfillWithValue(data)
     } catch (error) {
      return rejectWithValue(error.response.data)
     }
   }
 )
//Termék megjelenítése kosárban metódus vége
//Termék eltávolítása a kosárból metódus
export const delete_cart_product = createAsyncThunk(
  'cart/delete_cart_product',
     async(cart_id, { rejectWithValue,fulfillWithValue }) => {
     try {
    const {data} = await api.delete(`/home/product/delete-cart-product/${cart_id}`)
      //console.log(data)
      return fulfillWithValue(data)
     } catch (error) {
      return rejectWithValue(error.response.data)
     }
   }
 )
//Termék eltávolítása a kosárból metódus vége
//Termék mennyiségének növelése a kosárban metódus
export const quantity_inc = createAsyncThunk(
  'cart/quantity_inc',
     async(cart_id, { rejectWithValue,fulfillWithValue }) => {
     try {
    const {data} = await api.put(`/home/product/quantity-inc/${cart_id}`)
      //console.log(data)
      return fulfillWithValue(data)
     } catch (error) {
      return rejectWithValue(error.response.data)
     }
   }
 )
//Termék mennyiségének növelése a kosárban metódus vége
//Termék mennyiségének csökkentése a kosárban metódus
export const quantity_dec = createAsyncThunk(
  'cart/quantity_dec',
     async(cart_id, { rejectWithValue,fulfillWithValue }) => {
     try {
    const {data} = await api.put(`/home/product/quantity-dec/${cart_id}`)
      //console.log(data)
      return fulfillWithValue(data)
     } catch (error) {
      return rejectWithValue(error.response.data)
     }
   }
 )
//Termék mennyiségének csökkentése a kosárban metódus vége
//Termék hozzáadása kívánságlistához metódus
export const add_to_wishlist = createAsyncThunk(
  'wishlist/add_to_wishlist',
     async(info, { rejectWithValue,fulfillWithValue }) => {
     try {
    const {data} = await api.post('/home/product/add-to-wishlist/',info)
      //console.log(data)
      return fulfillWithValue(data)
     } catch (error) {
      return rejectWithValue(error.response.data)
     }
   }
 )
//Termék hozzáadása kívánságlistához metódus vége
//Termék megjelenítése a kívánságlistán metódus
export const get_wishlist_products = createAsyncThunk(
  'wishlist/get_wishlist_products',
     async(userId, { rejectWithValue,fulfillWithValue }) => {
     try {
    const {data} = await api.get(`/home/product/get-wishlist-products/${userId}`)
      //console.log(data)
      return fulfillWithValue(data)
     } catch (error) {
      return rejectWithValue(error.response.data)
     }
   }
 )
//Termék megjelenítése a kívánságlistán metódus vége
//Termék törlése kívánságlistáról metódus
export const remove_wishlist = createAsyncThunk(
  'wishlist/remove_wishlist',
     async(wishlistId, { rejectWithValue,fulfillWithValue }) => {
     try {
    const {data} = await api.delete(`/home/product/remove-wishlist-product/${wishlistId}`)
      //console.log(data)
      return fulfillWithValue(data)
     } catch (error) {
      return rejectWithValue(error.response.data)
     }
   }
 )
//Termék törlése kívánságlistáról metódus vége
export const cartReducer = createSlice({
   name: 'cart',
   initialState:{
    cart_products : [],
    cart_product_count: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    errorMessage: '',
    successMessage: '',
    shipping_fee: 0,
    outofstock_products: [],
    buy_product_item: 0
   },
 reducers : {
   messageClear : (state,_) => {
    state.errorMessage = ""
    state.successMessage = ""
   },
   reset_count: (state,_) => {
    state.cart_product_count = 0
    state.wishlist_count = 0
   }
 },
 extraReducers: (builder) => {
    builder
  //hibaüzenet esetén ezt tegye
  .addCase(add_to_cart.rejected, (state,{payload}) => {
    state.errorMessage = payload.error;
  })
  //a jobb felső ikonnál megjeleníti a kosárban található termékek számát
  .addCase(add_to_cart.fulfilled, (state,{payload}) => {
    state.successMessage = payload.message;
    state.cart_product_count = state.cart_product_count + 1
  })
  //kosárhoz hozzáadott termékek megjelenítése a backend 'cartController.js' alapján
  .addCase(get_cart_products.fulfilled, (state,{payload}) => {
    state.cart_products = payload.cart_products;
    state.price = payload.price
    state.cart_product_count = payload.cart_product_count
    state.shipping_fee = payload.shipping_fee
    state.outofstock_products = payload.outOfStockProduct
    state.buy_product_item = payload.buy_product_item
  })
  .addCase(delete_cart_product.fulfilled, (state,{payload}) => {
    state.successMessage = payload.message;
  })
  .addCase(quantity_inc.fulfilled, (state,{payload}) => {
    state.successMessage = payload.message;
  })
  .addCase(quantity_dec.fulfilled, (state,{payload}) => {
    state.successMessage = payload.message;
  })
  //kívánságlista üzeneteinek megjelenítése 'cartController.js' alapján
  .addCase(add_to_wishlist.rejected, (state,{payload}) => {
    state.errorMessage = payload.error;
  })
  .addCase(add_to_wishlist.fulfilled, (state,{payload}) => {
    state.successMessage = payload.message;
  //a jobb felső ikonnál megjeleníti a kívánságlistához adott termékek számát
    state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
  })
  //termékek megjelenítése a kívánságlistán
  .addCase(get_wishlist_products.fulfilled, (state,{payload}) => {
    state.wishlist = payload.wishlists;
    state.wishlist_count = payload.wishlistCount;
  })
  //termékek eltávolítása a kívánságlistáról
  .addCase(remove_wishlist.fulfilled, (state, { payload }) => { 
    state.successMessage = payload.message; 
    state.wishlist = state.wishlist.filter(p => p._id !== payload.wishlistId); 
    state.wishlist_count = state.wishlist_count - 1
})
 }
})

export const {messageClear, reset_count} = cartReducer.actions;
export default cartReducer.reducer;