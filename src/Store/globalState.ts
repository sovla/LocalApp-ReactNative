import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

// Define a type for the slice state
interface globalState {
  data: {
    token: string;
  };
}

// Define the initial state using that type
const initialState: globalState = {
  data: {
    token: '',
  },
};

export const globalSlice = createSlice({
  name: 'global',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeToken: (state, action: PayloadAction<string>) => {
      state.data.token = action.payload;
    },
  },
});

export const {changeToken} = globalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGlobal = (state: RootState) => state.lang.value;

export default globalSlice.reducer;
