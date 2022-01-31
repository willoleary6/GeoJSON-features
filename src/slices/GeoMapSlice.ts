import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../app/store";
import osmtogeojson from "osmtogeojson";

export interface coordinates {
    lat: number;
    lng: number;
}

export interface failedOpenStreetApiRequestResponse {
    message: string;
    errorCode: number;
}

export interface GeoJSON {
    data: {
        type: string;
        geometry: {
            type: string;
            coordinates: Array<Array<number>> | Array<Array<Array<number>>>;
        };
    };
}

export interface GeoMapState {
    canInduceMapMovements: boolean;
    centreCoordinates: coordinates;
    northWestCoordinates: coordinates;
    northEastCoordinates: coordinates;
    southWestCoordinates: coordinates;
    southEastCoordinates: coordinates;
    geoJsonData: GeoJSON;
}

export const initialState: GeoMapState = {
    canInduceMapMovements: true,
    centreCoordinates: { lat: 52.366130473786406, lng: -9.729074740570002 },
    northWestCoordinates: { lat: 0, lng: 0 },
    northEastCoordinates: { lat: 0, lng: 0 },
    southWestCoordinates: { lat: 0, lng: 0 },
    southEastCoordinates: { lat: 0, lng: 0 },

    geoJsonData: {
        data: {
            type: "",
            geometry: {
                type: "",
                coordinates: [[0, 0]],
            },
        },
    },
};

export const fetchOpenStreetData = createAsyncThunk(
    "geoMap/fetchOpenStreetData",
    async (args: null, { getState }) => {
        const state = getState() as { geoMap: GeoMapState };

        const left = state.geoMap.northWestCoordinates.lng.toFixed(12).toString();
        const bottom = state.geoMap.southWestCoordinates.lat.toFixed(12).toString();
        const right = state.geoMap.northEastCoordinates.lng.toFixed(12).toString();
        const top = state.geoMap.northEastCoordinates.lat.toFixed(12).toString();

        const url =
            "https://www.openstreetmap.org/api/0.6/map?bbox=" +
            left +
            "," +
            bottom +
            "," +
            right +
            "," +
            top;

        const response = await fetch(url, {
            // learn more about this API here: https://graphql-pokemon2.vercel.app/
            method: "GET",
        }).then((response) => {
            return response.text();
        });
        const parser = new DOMParser().parseFromString(response, "application/xml");
        console.log(osmtogeojson(parser));
        return osmtogeojson(parser);
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
    extraReducers: (builder) => {
        builder.addCase(fetchOpenStreetData.fulfilled, (GeoMapState, action) => {
            //GeoMapState.geoJsonData.data.type = action.payload.features[0].type;
            //GeoMapState.geoJsonData.data.geometry.type = action.payload.features[0].geometry.type;
            //GeoMapState.geoJsonData.data.geometry.coordinates = action.payload.features[0].geometry.coordinates;
            //GeoMapState.geoJsonData.data = action.payload.features[0];
        });
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
