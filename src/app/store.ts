import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import GeoMapSlice from "../slices/GeoMapSlice";
export const store = configureStore({
    reducer: {
        geoMap: GeoMapSlice,
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
