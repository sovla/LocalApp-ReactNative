import {configureStore} from '@reduxjs/toolkit';
import fontSizeState from './fontSizeState';
import globalState from './globalState';
import langState from './langState';
import userState from './userState';

const store = configureStore({
    reducer: {
        // the convention is to name this photos rather than photosStore but photosStore is clearer to me.
        // anyOtherStore: anyOtherSlice,
        // middleware: ['array of middlewares'],
        fontSize: fontSizeState,
        lang: langState,
        global: globalState,
        user: userState,
    },
    devTools: true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['global/changeToken'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['global'],
                // Ignore these paths in the state
                ignoredPaths: ['global.data.sb'],
            },
        }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
