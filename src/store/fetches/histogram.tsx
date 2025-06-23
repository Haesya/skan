import type {ErrorResponse, HistogramParams} from '../types.ts';
import type {RootState} from '../store.ts';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = async (url: string, params: HistogramParams, thunkApi: any) => {
    const { getState, rejectWithValue } = thunkApi;
    const { accessToken } = getState().auth;

    if (!accessToken) {
        return rejectWithValue({ message: 'Нет токена доступа' });
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(buildRequestBody(params)),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Ошибка загрузки:', errorData);
            return rejectWithValue({ message: errorData.message || 'Ошибка загрузки' });
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        return rejectWithValue({ message: 'Ошибка загрузки' });
    }
};

export const buildRequestBody = (params: HistogramParams) => {
    const { innField, tonality, startDate, endDate, docslimit, checkboxes } = params;
    const searchEntities = [
        {
            type: 'company',
            sparkId: null,
            entityId: null,
            inn: innField,
            checkbox0: checkboxes[0],
            checkbox1: checkboxes[1],
            checkbox2: checkboxes[2],
            checkbox3: checkboxes[3],
            checkbox4: checkboxes[4],
            checkbox5: checkboxes[5],
            checkbox6: checkboxes[6],
        },
    ];

    return {
        issueDateInterval: {
            startDate: `${startDate}T00:00:00+03:00`,
            endDate: `${endDate}T23:59:59+03:00`,
        },
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: searchEntities,
            },
            onlyMainRole: checkboxes[2],
            tonality: tonality,
            onlyWithRiskFactors: checkboxes[3],
        },
        attributeFilters: {
            excludeTechNews: checkboxes[4],
            excludeAnnouncements: checkboxes[5],
            excludeDigests: checkboxes[6],
        },
        similarMode: 'duplicates',
        limit: docslimit,
        sortType: 'sourceInfluence',
        sortDirectionType: 'desc',
        intervalType: 'month',
        histogramTypes: ['totalDocuments', 'riskFactors'],
    };
};

export const PostHistograms = createAsyncThunk<any, HistogramParams, { rejectValue: ErrorResponse; state: RootState }>(
    'histograms/postHistogram',
    async (params, thunkApi) => {
        return fetchData('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', params, thunkApi);
    }
);