import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

// Define a type for the slice state
export interface userState {
  mt_busi: 'Y' | 'N' | null;
  mt_country: string | null;
  mt_hp: string | null;
  mt_idx: string | null;
  mt_keyword: 'Y' | 'N' | null;
  mt_level: string | null;
  mt_marketing: 'Y' | 'N' | null;
  mt_memo: string | null;
  mt_message: 'Y' | 'N' | null;
  mt_message_id: null | string;
  mt_name: string | null;
  mt_pushcon: 'Y' | 'N' | null;
  mt_uid: string | null;
  mt_vibrate: 'Y' | 'N' | null;
}

// Define the initial state using that type
const initialState: userState = {
  mt_busi: 'N',
  mt_country: '55',
  mt_hp: '01083085727',
  mt_idx: '4',
  mt_keyword: 'N',
  mt_level: '2',
  mt_marketing: 'Y',
  mt_memo: '상태메세지입니다상태메세지입니다상태메세지입니다상태메세지입니다',
  mt_message: 'Y',
  mt_message_id: 'sound1',
  mt_name: 'kyoujin',
  mt_pushcon: 'Y',
  mt_uid: 'WzCnRHTaer',
  mt_vibrate: 'Y',
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
