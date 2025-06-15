import type {HistogramState} from "../types";
import { PostHistograms } from "../histogram";
import {type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: HistogramState = {
    data: [],
    status: 'idle',
    error: null,
    histogramsParams: {
        accessToken: '',
        innField: '',
        tonality: 'any',
        docslimit: 0,
        startDate: '',
        endDate: '',
        checkboxes: Array(7).fill(false),
    },
};

const histogramReducer = createSlice({
    name: 'histograms',
    initialState,
    reducers: {
        innReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                innField: action.payload
            };
        },
        tonalityReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                tonality: action.payload
            };
        },
        docslimitReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                docslimit: action.payload
            };
        },
        setCheckbox: (state, action: PayloadAction<{ index: number; checked: boolean }>) => {
            const newCheckboxes = [...state.histogramsParams.checkboxes];
            newCheckboxes[action.payload.index] = action.payload.checked;
            state.histogramsParams.checkboxes = newCheckboxes;
        },
        startDateReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                startDate: action.payload
            };
        },
        endDateReducer: (state, action) => {
            state.histogramsParams = {
                ...state.histogramsParams,
                endDate: action.payload
            };
        },
        resetFormReducer: (state) => {
            state.histogramsParams = {
                accessToken: '',
                innField: '',
                tonality: 'any',
                docslimit: 0,
                startDate: '',
                endDate: '',
                checkboxes: Array(7).fill(false),
            };
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(PostHistograms.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(PostHistograms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(PostHistograms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Ошибка загрузки';
            });
    },
});

export const {
    innReducer,
    tonalityReducer,
    docslimitReducer,
    startDateReducer,
    endDateReducer,
    setCheckbox,
    resetFormReducer
} = histogramReducer.actions;

export default histogramReducer.reducer;