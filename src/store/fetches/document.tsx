import type {DocumentParams, ErrorResponse} from '../types.ts';
import type {RootState} from '../store.ts';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const PostDocuments = createAsyncThunk<any, DocumentParams, { rejectValue: ErrorResponse }>(
    "documents/postDocuments",
    async ({ listEncodedId }, thunkApi) => {
        try {
            const { getState } = thunkApi;
            const state = getState() as RootState;
            const { accessToken } = state.auth;

            const response = await fetch(`https://gateway.scan-interfax.ru/api/v1/documents`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ "ids": listEncodedId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                return thunkApi.rejectWithValue({ message: errorData.message || 'Ошибка загрузки' });
            }

            const data = await response.json();
            return data;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ошибка загрузки';
            return thunkApi.rejectWithValue({ message });
        }
    }
);