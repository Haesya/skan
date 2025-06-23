import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { PostObjectSearch } from '../fetches/objectsearch.tsx'
import type {ObjectsearchState, SearchItem} from '../types.ts';

const initialState: ObjectsearchState = {
    dataObjectsearch: [],
    status: 'idle',
    error: null
};

const objectSearchReducer = createSlice({
    name: 'objectsearchReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(PostObjectSearch.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(PostObjectSearch.fulfilled, (state, action: PayloadAction<{ items: SearchItem[] }>) => {
                state.dataObjectsearch = action.payload.items.map((item: SearchItem) => item.encodedId);
                state.status = 'succeeded';
            })
            .addCase(PostObjectSearch.rejected, (state, action: PayloadAction<{ message: string } | undefined>) => {
                state.status = 'failed';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            });
    }
});

export default objectSearchReducer.reducer;