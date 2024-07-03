import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/sales/salesSlice'


export const store = configureStore({
    reducer: {
        sales: counterReducer,
    },
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>