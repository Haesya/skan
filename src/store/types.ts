export interface HistogramParams {
    innField: string;
    tonality: string;
    docslimit: number;
    startDate: string;
    endDate: string;
    checkboxes: boolean[];
}

export interface DocumentParams {
    listEncodedId: string[];
}

export interface ErrorResponse {
    message: string;
}

export interface EventFiltersInfo {
    usedCompanyCount: number;
    companyLimit: number;
}
  
export interface AccountInfo {
    eventFiltersInfo: EventFiltersInfo;
}
  
export interface Tariff {
    id: number;
    name: string;
}
  
export interface AuthState {
    accessToken: string | null;
    expire: string | null;
    status: 'idle' | 'loading' | 'failed';
    isLogged: boolean;
    error: { field: string, message: string } | null;
    accountInfo: AccountInfo | null; 
    loadingAccountInfo: boolean;
    currentTariff: Tariff | null;
}

export interface HistogramState {
    data: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    histogramsParams: {
        accessToken: string,
        innField: string,
        tonality: string,
        docslimit: number,
        startDate: string,
        endDate: string,
        checkboxes: boolean[];
    },
}

export interface SearchItem {
    encodedId: string;
}

export interface ObjectsearchState {
    dataObjectsearch: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface DocumentsState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    shownDocs: number;
}