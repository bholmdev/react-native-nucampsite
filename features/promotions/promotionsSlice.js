import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchPromotions = createAsyncThunk(
    'promotions/fetchPromotions',
    async () => {
        const response = await fetch(baseUrl + 'promotions');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const promotionsSlice = createSlice({
    name: 'promotions',
    initialState: { isLoading: true, errMess: null, promotionsArray: [] },
    reducers: {},
    extraReducers: {
        [fetchPromotions.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchPromotions.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errMess = null;
            state.promotionsArray = action.payload;
        },
        [fetchPromotions.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMess = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }
});

export const promotionsReducer = promotionsSlice.reducer;
