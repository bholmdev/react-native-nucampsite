import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async () => {
        const response = await fetch(baseUrl + 'partners');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const partnersSlice = createSlice({
    name: 'partners',
    initialState: { isLoading: true, errMess: null, partnersArray: [] },
    reducers: {},
    extraReducers: {
        [fetchPartners.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchPartners.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.partnersArray = action.payload;
        },
        [fetchPartners.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
});

export const partnersReducer = partnersSlice.reducer;
