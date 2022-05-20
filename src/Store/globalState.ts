import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import SendBird from 'sendbird';
import type {RootState} from './store';

// Define a type for the slice state

const sb = new SendBird({appId: '51370DED-8264-431F-8323-4DEA9FF7BFD6'});
sb.setErrorFirstCallback(true);
interface globalState {
    data: {
        token: string;
        sb: SendBird.SendBirdInstance;
    };
}

// Define the initial state using that type
const initialState: globalState = {
    data: {
        token: '',
        sb: sb,
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
