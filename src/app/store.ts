import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import configurationReducer from "../slices/configurationSlice";

export const store = configureStore({
    reducer: {
        configuration: configurationReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return [...getDefaultMiddleware()];
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
