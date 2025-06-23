import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./histogram";
import type {RootState} from '../store.ts';
import type {ErrorResponse, HistogramParams} from '../types.ts';

export const PostObjectSearch = createAsyncThunk<any, HistogramParams, { rejectValue: ErrorResponse; state: RootState }>(
    'objectsearch/postObjectsearch',
    async (params, thunkApi) => {
        return fetchData('https://gateway.scan-interfax.ru/api/v1/objectsearch', params, thunkApi);
    }
);