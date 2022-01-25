import React from "react";
import { GeoJsonData } from "../../features/GeoJsonData";
import { GeoMap } from "../../features/GeoMap";
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
