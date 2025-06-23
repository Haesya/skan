import { createSlice } from '@reduxjs/toolkit';
import { PostDocuments } from '../fetches/document.tsx'
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(PostDocuments.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(PostDocuments.fulfilled, (state, { payload }) => {
                state.data = [...payload] // Сохраняем полученные документы
                state.status = 'succeeded';
            })
            .addCase(PostDocuments.rejected, (state, { payload }) => {
                state.status = 'failed';
                if (payload) {
                    state.error = payload.message;
                }
            });
    }
});

export const { showDocs, setInitialShownDocs } = documentsReducer.actions;
export default documentsReducer.reducer;