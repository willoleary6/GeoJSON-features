import React from "react";
import { GeoJsonData } from "../../features/geoJsonData/geoJsonData";
import { GeoMap } from "../../features/geoMap/geoMap";
export function GeoJsonDashboard(): JSX.Element {
    return (
        <>
            {/* Wrap it in a dummy jsx parent */}
            <div className="row">
                <div className="col-lg-5 mt-3">
                    <GeoMap />
                </div>
                <div className="col-lg-5 mt-3">
                    <GeoJsonData />
                </div>
            </div>
        </>
    );
}
