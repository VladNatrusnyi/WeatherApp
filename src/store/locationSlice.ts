import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

export interface LocationState {
  isCitySelected: boolean;
  location: string | null;
}

const initialState: LocationState = {
  isCitySelected: true,
  location: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setIsCitySelected: (state, action: PayloadAction<boolean>) => {
      state.isCitySelected = action.payload;
    },
    setLocation: (state, action: PayloadAction<string | null>) => {
      state.location = action.payload;
    },
    resetLocationState: (state) => {
      state.isCitySelected = false;
      state.location = null;
    },
  },
});

export const { setIsCitySelected, setLocation, resetLocationState } = locationSlice.actions;

export const selectLocationState = (state: RootState) => state.location;

export default locationSlice.reducer;
