import { LatLngBounds } from "leaflet";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap, GeoJSON } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    disableReduxInducedMapMovements,
    enableReduxInducedMapMovements,
    fetchOpenStreetData,
    selectGeoMap,
    updateCentreCoordinates,
    updateNorthEastCoordinates,
    updateNorthWestCoordinates,
    updateSouthEastCoordinates,
    updateSouthWestCoordinates,
} from "../../slices/GeoMapSlice";
import { CoordinateDisplay } from "./CoordinateDisplay";
import { CoordinateInput } from "./CoordinateInput";
import "./MapWidget.css";

export const MapWidget = (): JSX.Element => {
    const geoMapSlice = useAppSelector(selectGeoMap);
    const dispatch = useAppDispatch();

    const updateCornerCoordinates = (bounds: LatLngBounds) => {
        const northEastCoordinates = bounds.getNorthEast();
        const southWestCoordinates = bounds.getSouthWest();
        const northWestCoordinates = bounds.getNorthWest();
        const southEastCoordinates = bounds.getSouthEast();
        dispatch(
            updateNorthWestCoordinates({
                lat: northWestCoordinates.lat,
                lng: northWestCoordinates.lng,
            })
        );
        dispatch(
            updateNorthEastCoordinates({
                lat: northEastCoordinates.lat,
                lng: northEastCoordinates.lng,
            })
        );
        dispatch(
            updateSouthWestCoordinates({
                lat: southWestCoordinates.lat,
                lng: southWestCoordinates.lng,
            })
        );
        dispatch(
            updateSouthEastCoordinates({
                lat: southEastCoordinates.lat,
                lng: southEastCoordinates.lng,
            })
        );
    };

    const searchForCoordinates = async (latitude: number, longitude: number) => {
        await dispatch(enableReduxInducedMapMovements());
        await dispatch(
            updateCentreCoordinates({
                lat: latitude,
                lng: longitude,
            })
        );
        await dispatch(disableReduxInducedMapMovements());
        await dispatch(fetchOpenStreetData(null));
    };
    const Markers = () => {
        useMapEvents({
            dragend() {
                dispatch(enableReduxInducedMapMovements());

                dispatch(fetchOpenStreetData(null));
            },
            dragstart() {
                dispatch(disableReduxInducedMapMovements());
            },
            zoomend() {
                dispatch(fetchOpenStreetData(null));
            },

            move(moveEvent) {
                dispatch(
                    updateCentreCoordinates({
                        lat: moveEvent.target.getCenter().lat,
                        lng: moveEvent.target.getCenter().lng,
                    })
                );
                updateCornerCoordinates(moveEvent.target.getBounds());
            },
        });
        return null;
    };
    return (
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                crossOrigin=""
            />
            <script
                src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                crossOrigin=""
            ></script>
            <div className="map-element-row">
                <CoordinateInput searchForCoordinates={searchForCoordinates} />
            </div>
            <div className="map-element-row">
                <CoordinateDisplay
                    coordinates={geoMapSlice.northWestCoordinates}
                    displayClassName="latitude-value-container"
                    coordinateRounding={5}
                />
                <CoordinateDisplay
                    coordinates={geoMapSlice.northEastCoordinates}
                    displayClassName="longitude-value-container"
                    coordinateRounding={5}
                />
            </div>
            <div id="map">
                <div id="crosshair">(+)</div>
                <MapContainer
                    center={[geoMapSlice.centreCoordinates.lat, geoMapSlice.centreCoordinates.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="leaflet-map-container"
                    whenCreated={(map) => {
                        updateCornerCoordinates(map.getBounds());
                    }}
                >
                    <Markers />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <ChangeMapView
                        latitude={geoMapSlice.centreCoordinates.lat}
                        longitude={geoMapSlice.centreCoordinates.lng}
                    />
                </MapContainer>
            </div>
            <div className="map-element-row">
                <CoordinateDisplay
                    coordinates={geoMapSlice.southWestCoordinates}
                    displayClassName="latitude-value-container"
                    coordinateRounding={5}
                />
                <CoordinateDisplay
                    coordinates={geoMapSlice.southEastCoordinates}
                    displayClassName="longitude-value-container"
                    coordinateRounding={5}
                />
            </div>
        </>
    );
};

interface coordinateProps {
    latitude: number;
    longitude: number;
}
const ChangeMapView = ({ latitude, longitude }: coordinateProps): JSX.Element => {
    const geoMapSlice = useAppSelector(selectGeoMap);
    const map = useMap();
    const mapCentre = map.getCenter();

    if (
        (mapCentre.lat != geoMapSlice.centreCoordinates.lat ||
            mapCentre.lng != geoMapSlice.centreCoordinates.lng) &&
        geoMapSlice.canInduceMapMovements
    ) {
        map.panTo([latitude, longitude]);
    }
    return <></>;
};
