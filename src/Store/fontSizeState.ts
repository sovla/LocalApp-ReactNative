import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';

// Define a type for the slice state
export interface fontSizeState {
    value: number;
    size: 'Small' | 'Medium' | 'Large';
}

// Define the initial state using that type
const initialState: fontSizeState = {
    value: 1,
    size: 'Medium',
};

export const fontSizeSlice = createSlice({
    name: 'fontSize',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        fontChange: (state, action: PayloadAction<fontSizeState>) => {
            state.value = action.payload.value;
            state.size = action.payload.size;
        },
    },
});

export const {fontChange} = fontSizeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFontSize = (state: RootState) => state.lang.value;

export default fontSizeSlice.reducer;
