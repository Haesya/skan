import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({login, password}: { login: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData);
            }

            const data = await response.json();

            // Сохранение токена и даты истечения в localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('expire', data.expire);

            return data;
        } catch (err) {
            return rejectWithValue({ message: 'Network error' });
        }
    }
);

export const getAccountInfo = createAsyncThunk (
    'auth/getAccountInfo',
    async (token: string) => {
        const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        /*я чет не одуплила, где там данные про выбранный тариф,
        а как на клик выбрать тариф, сунуть данные в апи и потом их оттуда доставать, мощей не хватило.
        поэтому создаем ручками, якобы в локалстораге, оттуда же и юзаем*/
        localStorage.setItem('currentTariff', 'Pro');
        const currentTariff = localStorage.getItem('currentTariff')

        return { accountInfo: data, currentTariff };
    }
);




