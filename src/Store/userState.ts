import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

// Define a type for the slice state
export interface userState {
  mt_busi: 'Y' | 'N' | null;
  mt_country: string | null;
  mt_hp: string | null;
  mt_idx: string | null;
  mt_level: string | null;
  mt_marketing: 'Y' | 'N' | null;
  mt_memo: string | null;
  mt_name: string | null;
  mt_uid: string | null;
}

// Define the initial state using that type
const initialState: userState = {
  mt_busi: null,
  mt_country: null,
  mt_hp: null,
  mt_idx: '3',
  mt_level: null,
  mt_marketing: null,
  mt_memo: null,
  mt_name: null,
  mt_uid: null,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<userState>) => {
      state = action.payload;
    },
  },
});

export const {changeUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
