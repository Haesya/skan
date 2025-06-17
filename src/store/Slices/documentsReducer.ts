import { createSlice } from '@reduxjs/toolkit';
import type {DocumentsState} from '../types';

const initialState: DocumentsState = {
    data: [],
    status: 'idle',
    error: null,
    shownDocs: 10
};

const documentsReducer = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        showDocs: (state, action) => {
            state.shownDocs += action.payload;

        },
        setInitialShownDocs: (state, action) => {
            state.shownDocs = action.payload;
        }
    }
});

export const { showDocs, setInitialShownDocs } = documentsReducer.actions;
export default documentsReducer.reducer;