import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../app/store";
import osmtogeojson from "osmtogeojson";
import { couldStartTrivia } from "typescript";

export interface coordinates {
    lat: number;
    lng: number;
}

export interface IProperty {
    boundary: string;
    changeset: string;
    id: string;
    logainm: string;
    name: string;
    source: string;
    timestamp: string;
    type: string;
    uid: string;
    user: string;
    version: string;
}
export interface IGeometry {
    type: string;
    coordinates: [number, number][] | [number, number][][] | [number, number][][][];
}

export interface IGeoJson {
    type: string;
    geometry: IGeometry;
    bbox?: number[];
    properties?: IProperty;
}

export class GeoJson implements IGeoJson {
    constructor(
        public type: string,
        public geometry: IGeometry,
        properties?: IProperty,
        bbox?: number[]
    ) {}
}

export interface GeoMapState {
    canInduceMapMovements: boolean;
    centreCoordinates: coordinates;
    northWestCoordinates: coordinates;
    northEastCoordinates: coordinates;
    southWestCoordinates: coordinates;
    southEastCoordinates: coordinates;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geoJsonData: any;
}

export const initialState: GeoMapState = {
    canInduceMapMovements: true,
    centreCoordinates: { lat: 52.366130473786406, lng: -9.729074740570002 },
    northWestCoordinates: { lat: 0, lng: 0 },
    northEastCoordinates: { lat: 0, lng: 0 },
    southWestCoordinates: { lat: 0, lng: 0 },
    southEastCoordinates: { lat: 0, lng: 0 },

    geoJsonData: [],
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

        return response;
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
            //osmtogeojson(
            if (
                action.payload !=
                "You requested too many nodes (limit is 50000). Either request a smaller area, or use planet.osm"
            ) {
                const parser = new DOMParser().parseFromString(action.payload, "application/xml");
                const test = osmtogeojson(parser);
                GeoMapState.geoJsonData = test.features;
            }
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
