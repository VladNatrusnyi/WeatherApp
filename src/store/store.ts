import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from './weatherApi';
import locationReducer from './locationSlice.ts';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

