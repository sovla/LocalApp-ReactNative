import {configureStore} from '@reduxjs/toolkit';
import fontSizeState from './fontSizeState';
import langState from './langState';

const store = configureStore({
  reducer: {
    // the convention is to name this photos rather than photosStore but photosStore is clearer to me.
    // anyOtherStore: anyOtherSlice,
    // middleware: ['array of middlewares'],
    fontSize: fontSizeState,
    lang: langState,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
