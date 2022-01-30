import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../app/hooks";
import { RootState, store } from "../app/store";

export interface coordinates {
    lat: number;
    lng: number;
}

export interface GeoMapState {
    canInduceMapMovements: boolean;
    centreCoordinates: coordinates;
    northWestCoordinates: coordinates;
    northEastCoordinates: coordinates;
    southWestCoordinates: coordinates;
    southEastCoordinates: coordinates;
}

export const initialState: GeoMapState = {
    canInduceMapMovements: true,
    centreCoordinates: { lat: 52.52437, lng: 13.41053 },
    northWestCoordinates: { lat: 0, lng: 0 },
    northEastCoordinates: { lat: 0, lng: 0 },
    southWestCoordinates: { lat: 0, lng: 0 },
    southEastCoordinates: { lat: 0, lng: 0 },
};

export const fetchOpenStreetData = createAsyncThunk(
    "geoMap/fetchOpenStreetData",
    async (args: null, { getState }) => {
        const state = getState() as GeoMapState;

        const url =
            "https://www.openstreetmap.org/api/0.6/map?bbox=" +
            state.northWestCoordinates.lng.toString() +
            "," +
            state.southWestCoordinates.lat.toString() +
            "," +
            state.northEastCoordinates.lng.toString() +
            "," +
            state.northEastCoordinates.lat.toString();

        console.log(url);
        const test = await fetch(url).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log("rec");
            console.log(response);
        });
        console.log(test);
        return null;
    }
);

export const geoMapSlice = createSlice({
    name: "GeoMap",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateCentreCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.centreCoordinates = action.payload;
        },
        updateNorthWestCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.northWestCoordinates = action.payload;
        },
        updateNorthEastCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.northEastCoordinates = action.payload;
        },
        updateSouthWestCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.southWestCoordinates = action.payload;
        },
        updateSouthEastCoordinates: (GeoMapState, action: PayloadAction<coordinates>) => {
            GeoMapState.southEastCoordinates = action.payload;
        },
        disableReduxInducedMapMovements: (GeoMapState) => {
            GeoMapState.canInduceMapMovements = false;
        },
        enableReduxInducedMapMovements: (GeoMapState) => {
            GeoMapState.canInduceMapMovements = true;
        },
    },
});

export const {
    updateCentreCoordinates,
    updateNorthEastCoordinates,
    updateNorthWestCoordinates,
    updateSouthEastCoordinates,
    updateSouthWestCoordinates,
    disableReduxInducedMapMovements,
    enableReduxInducedMapMovements,
} = geoMapSlice.actions;

export const selectGeoMap = (state: RootState): GeoMapState => state.geoMap;

export default geoMapSlice.reducer;
