import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authReducer";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import histogramReducer from "./Slices/histogramReducer";
import objectsearchReducer from './Slices/objectSearchReducer.ts';
import documentsReducer from "./Slices/documentsReducer";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers ({
  auth: authReducer,
  histograms: histogramReducer,
  objectsearch: objectsearchReducer,
  docs: documentsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});

persistStore(store);

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;