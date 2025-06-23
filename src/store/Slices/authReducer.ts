import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getAccountInfo, loginUser } from '../fetches/login.tsx'
import type {AuthState} from '../types.ts';

const initialState: AuthState = {
    accessToken: null,
    expire: null,
    status: 'idle',
    isLogged: false,
    error: null,
    accountInfo: null,
    loadingAccountInfo: false,
    currentTariff: null,
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.expire = null;
            state.isLogged = false;
            state.error = null;
            state.accountInfo = null;
            state.loadingAccountInfo = false;
            state.currentTariff = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'idle';
                state.accessToken = action.payload.accessToken;
                state.expire = action.payload.expire;
                state.isLogged = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.isLogged = false;
                state.error = action.payload;
            })

            .addCase(getAccountInfo.pending, (state) => {
                state.loadingAccountInfo = true;
            })
            .addCase(getAccountInfo.fulfilled, (state, action) => {
                state.loadingAccountInfo = false;
                state.accountInfo = action.payload.accountInfo;
                state.currentTariff = action.payload.currentTariff;
            })
            .addCase(getAccountInfo.rejected, (state) => {
                state.loadingAccountInfo = false;
                state.accountInfo = null;
                state.currentTariff = null;
            });
    },
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;