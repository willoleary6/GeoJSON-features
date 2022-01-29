import React from "react";
import "./MapWidget.css";
import { coordinates } from "../../slices/GeoMapSlice";
interface coordinateProps {
    coordinates: coordinates;
    displayClassName: string;
    coordinateRounding: number;
}

export const CoordinateDisplay = ({
    coordinates,
    displayClassName: displayClassName,
    coordinateRounding,
}: coordinateProps): JSX.Element => {
    return (
        <>
            <div className={displayClassName}>
                <p className={"longitude-latitude-titlebox"}>
                    {coordinates.lat.toFixed(coordinateRounding)},{" "}
                    {coordinates.lng.toFixed(coordinateRounding)}
                </p>
            </div>
        </>
    );
};
