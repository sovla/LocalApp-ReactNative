import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

// Define a type for the slice state
export interface userState {
    mt_busi: 'Y' | 'N' | null;
    mt_country: string | null;
    mt_hp: string | null;
    mt_hp_open: 'Y' | 'N' | null;
    mt_idx: string | null;
    mt_keyword: 'Y' | 'N' | null;
    mt_level: string | null;
    mt_marketing: 'Y' | 'N' | null;
    mt_memo: string | null;
    mt_message: 'Y' | 'N' | null;
    mt_message_id: null | string;
    mt_name: string | null;
    mt_profile: string | null;
    mt_pushcon: 'Y' | 'N' | null;
    mt_uid: string | null;
    mt_vibrate: 'Y' | 'N' | null;
}

// Define the initial state using that type
const initialState: userState = {
    mt_busi: 'Y',
    mt_country: '55',
    mt_hp: '01088085727',
    mt_hp_open: 'Y',
    mt_idx: '3',
    mt_keyword: 'N',
    mt_level: '2',
    mt_marketing: 'Y',
    mt_memo: '',
    mt_message: 'Y',
    mt_message_id: 'sound1',
    mt_name: 'kyoujin',
    mt_profile: 'https://dmonster1786.cafe24.com/images/uploads/mt_profile_14_6JuqS2vf.jpg',
    mt_pushcon: 'Y',
    mt_uid: 'Takymp4EKW',
    mt_vibrate: 'Y',
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        changeUser: (state, action: PayloadAction<userState>) => {
            return (state = {
                ...state,
                ...action.payload,
            });
        },
        changeProfileImage: (state, action: PayloadAction<userState['mt_profile']>) => {
            return (state = {
                ...state,
                mt_profile: action.payload,
            });
        },
        changeTell: (state, action: PayloadAction<Pick<userState, 'mt_hp' | 'mt_country'>>) => {
            return (state = {
                ...state,
                mt_hp: action.payload.mt_hp,
                mt_country: action.payload.mt_country,
            });
        },
    },
});

export const {changeUser, changeProfileImage, changeTell} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
