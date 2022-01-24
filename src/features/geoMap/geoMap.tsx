import React from "react";
import Card from "react-bootstrap/Card";
import { LoadingSpinner } from "../loadingSpinner/loadingSpinner";

export const GeoMap = (): JSX.Element => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Geo Map</Card.Title>
                <LoadingSpinner />
            </Card.Body>
        </Card>
    );
};