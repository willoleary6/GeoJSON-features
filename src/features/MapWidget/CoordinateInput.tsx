import React, { ChangeEvent } from "react";
import "./MapWidget.css";
import { coordinates } from "../../slices/GeoMapSlice";
interface coordinateProps {
    coordinates: coordinates;
    inputClassName: string;
    coordinateName: string;
}

export const CoordinateInput = ({
    coordinates,
    inputClassName,
    coordinateName,
}: coordinateProps): JSX.Element => {
    return (
        <>
            <div className={inputClassName}>
                <p className={"longitude-latitude-titlebox"}>
                    {coordinates.lat}, {coordinates.lng}
                </p>
            </div>
        </>
    );
};
