import React, { useState, ChangeEvent, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
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
import { CoordinateInput } from "./CoordinateInput";
import "./MapWidget.css";

export const MapWidget = (): JSX.Element => {
    const geoMapSlice = useAppSelector(selectGeoMap);
    const dispatch = useAppDispatch();

    const latOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        let newLatitude = parseFloat(event.target.value);
        console.log(newLatitude);
        if (Number.isNaN(newLatitude)) {
            newLatitude = 0;
        }
        //dispatch(updateCentreLatitude(newLatitude));
        //moveMapOnStateChange();
    };

    const lngOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newLongitude = parseFloat(event.target.value);
        if (Number.isNaN(newLongitude)) {
            newLongitude = 0;
        }
        //dispatch(updateCentreLongitude(newLongitude));
        //moveMapOnStateChange();
    };
    const Markers = () => {
        useMapEvents({
            dragend() {
                dispatch(enableReduxInducedMapMovements());
                dispatch(fetchOpenStreetData());
            },
            dragstart() {
                dispatch(disableReduxInducedMapMovements());
            },
            move(moveEvent) {
                dispatch(
                    updateCentreCoordinates({
                        lat: moveEvent.target.getCenter().lat,
                        lng: moveEvent.target.getCenter().lng,
                    })
                );
                const bounds = moveEvent.target.getBounds();
                const northEastCoordinates = bounds["_northEast"];
                const southWestCoordinates = bounds["_southWest"];
                const northWestCoordinates = {
                    lat: northEastCoordinates.lat,
                    lng: southWestCoordinates.lng,
                };
                const southEastCoordinates = {
                    lat: southWestCoordinates.lat,
                    lng: northEastCoordinates.lng,
                };
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
                <CoordinateInput
                    coordinates={geoMapSlice.northWestCoordinates}
                    inputClassName="latitude-value-container"
                    coordinateName="Latitude"
                />
                <CoordinateInput
                    coordinates={geoMapSlice.northEastCoordinates}
                    inputClassName="longitude-value-container"
                    coordinateName="Longitude"
                />
            </div>
            <div id="map">
                <div id="crosshair">(+)</div>
                <MapContainer
                    center={[geoMapSlice.centreCoordinates.lat, geoMapSlice.centreCoordinates.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="leaflet-map-container"
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
                <CoordinateInput
                    coordinates={geoMapSlice.southWestCoordinates}
                    inputClassName="latitude-value-container"
                    coordinateName="Latitude"
                />
                <CoordinateInput
                    coordinates={geoMapSlice.southEastCoordinates}
                    inputClassName="longitude-value-container"
                    coordinateName="Longitude"
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
        (mapCentre.lat != geoMapSlice.latitude || mapCentre.lng != geoMapSlice.longitude) &&
        geoMapSlice.canInduceMapMovements
    ) {
        map.setView([latitude, longitude], map.getZoom());
    }
    return <></>;
};
