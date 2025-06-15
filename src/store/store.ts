import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../../src/store/Slices/authReducer";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import histogramReducer from "../../src/store/Slices/histogramReducer.ts";
import objectsearchReducer from "../../src/store/Slices/objectsearchReducer";
import documentsReducer from "../../src/store/Slices/documentsReducer";

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
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
      mmutableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;