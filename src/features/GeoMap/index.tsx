import React from "react";
import Card from "react-bootstrap/Card";
import { MapWidget } from "../MapWidget";

export const GeoMap = (): JSX.Element => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Geo Map</Card.Title>
                <MapWidget />
            </Card.Body>
        </Card>
    );
};
