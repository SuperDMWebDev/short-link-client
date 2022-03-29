import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
    name: 'link',
    initialState: {
        url: null,
        shortUrl: null,
    },
    reducers: {
        short: (state, action) => {
            state.url = action.payload.url
            state.shortUrl = action.payload.shortUrl
        },
    }
})