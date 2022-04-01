import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

// Define a type for the slice state
interface fontSizeState {
  value: number;
}

// Define the initial state using that type
const initialState: fontSizeState = {
  value: 1,
};

export const fontSizeSlice = createSlice({
  name: 'fontSize',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    change: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const {change} = fontSizeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFontSize = (state: RootState) => state.lang.value;

export default fontSizeSlice.reducer;
