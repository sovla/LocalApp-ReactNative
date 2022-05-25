import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

// Define a type for the slice state
interface langState {
    value: string;
}

// Define the initial state using that type
const initialState: langState = {
    value: 'ko',
};

export const langSlice = createSlice({
    name: 'lang',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        changeLang: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const {changeLang} = langSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLang = (state: RootState) => state.lang.value;

export default langSlice.reducer;
