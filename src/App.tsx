import React from "react";
import { Switch, Route } from "react-router-dom";

import { SideNavbar } from "./features/sideNavbar/SideNavbar";
import { TopNavbar } from "./features/topNavbar/TopNavbar";
import { routes } from "./routes/routes";
import { Footer } from "./features/footer/footer";
import { ConfigurationPanel } from "./features/configurationPanel/configurationPanel";
function App(): JSX.Element {
    const renderRoutes: JSX.Element[] = [];
    routes.forEach((route) => {
        if (route.subroutes) {
            route.subroutes.forEach((subroute) => {
                renderRoutes.push(
                    <Route exact key={subroute.id} path={subroute.path}>
                        {subroute.component ? <subroute.component /> : <></>}
                    </Route>
                );
            });
        } else {
            renderRoutes.push(
                <Route exact key={route.id} path={route.path}>
                    {route.component ? <route.component /> : <></>}
                </Route>
            );
        }
    });
    return (
        <React.Fragment>
            <div id="wrapper">
                <TopNavbar></TopNavbar>
                <SideNavbar routes={routes}></SideNavbar>
                <div id="page-wrapper" className="gray-bg">
                    <Switch>{renderRoutes}</Switch>
                    <Footer></Footer>
                </div>
            </div>
            <ConfigurationPanel></ConfigurationPanel>
        </React.Fragment>
    );
}

export default App;
