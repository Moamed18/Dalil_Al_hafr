import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let token = localStorage.getItem('userToken')
let headers = {
    Authorization: `Bearer ${token}`
}

const body = { title: "All" }
export let getAllItems = createAsyncThunk('item/getAllItems', async () => {
    let { data } = await axios.get('https://dalilalhafr.com/api/items/getAllitems', { headers })
    return data;
})
export let getOneItem = createAsyncThunk('item/getOneItem', async (id) => {
    
    let { data } = await axios(`https://dalilalhafr.com/api/items/getSpecificItem/${id}`,{headers})
    console.log(data);
    return data;
})

let ItemSlice = createSlice({
    name: "item",
    initialState: { ItemsList: [], OneItemData: {}, loading: false },
    extraReducers: (bulider) => {
        bulider.addCase(getAllItems.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getAllItems.fulfilled, (state, action) => {
            let { data } = action.payload
            state.ItemsList = data
            state.loading = false

        })
        bulider.addCase(getOneItem.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getOneItem.fulfilled, (state, action) => {
            let { data } = action.payload
            state.OneItemData = data
            console.log(state.OneItemData);
            state.loading = false

        })
    }
})
export let ItemReduser = ItemSlice.reducer

