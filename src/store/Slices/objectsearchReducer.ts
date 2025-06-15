import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { PostObjectSearch } from '../objectsearch';
import type {ObjectsearchState, SearchItem} from '../types';

const initialState: ObjectsearchState = {
    dataObjectsearch: [],
    status: 'idle',
    error: null
};

const objectsearchReducer = createSlice({
    name: 'objectsearchReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Обработчики дополнительных действий
        builder
            .addCase(PostObjectSearch.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(PostObjectSearch.fulfilled, (state, action: PayloadAction<{ items: SearchItem[] }>) => {
                // Обработка успешного ответа
                state.dataObjectsearch = action.payload.items.map((item: SearchItem) => item.encodedId);
                state.status = 'succeeded';
            })
            .addCase(PostObjectSearch.rejected, (state, action: PayloadAction<{ message: string } | undefined>) => {
                // Обработка ошибки
                state.status = 'failed';
                if (action.payload) {
                    state.error = action.payload.message;
                }
            });
    }
});

export default objectsearchReducer.reducer;