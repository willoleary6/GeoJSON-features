import React from "react";
import Card from "react-bootstrap/Card";
import { LoadingSpinner } from "../loadingSpinner/loadingSpinner";

export const GeoJsonData = (): JSX.Element => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Geo Json</Card.Title>
                <LoadingSpinner />
            </Card.Body>
        </Card>
    );
};
