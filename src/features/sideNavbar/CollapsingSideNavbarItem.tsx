import React, { useRef, useState } from "react";

import Collapse from "react-bootstrap/Collapse";
import { Route } from "../../routes/routes";
import { SideNavbarItem } from "./SideNavbarItem";

interface CollapsingSideNavbarItemProps {
    route: Route;
}
export const CollapsingSideNavbarItem = ({ route }: CollapsingSideNavbarItemProps): JSX.Element => {
    const [active, setActive] = useState(false);
    const toggleActive = () => {
        setActive(!active);
    };

    const subList = useRef<HTMLUListElement>(null);
    const addInClass = () => {
        subList.current?.classList.toggle("in");
    };

    let subListRender;
    if (route.subroutes) {
        subListRender = (
            <Collapse in={active} onEntered={addInClass}>
                <ul className="nav nav-second-level" ref={subList}>
                    {route.subroutes.map((subroute) => (
                        <SideNavbarItem key={subroute.id} route={subroute}></SideNavbarItem>
                    ))}
                </ul>
            </Collapse>
        );
    }

    return (
        <li className={active ? "active" : ""}>
            <a className="nothing" onClick={toggleActive}>
                {route.icon} <span className="nav-label">{route.label}</span>{" "}
                <span className="fa arrow"></span>
            </a>
            {subListRender}
        </li>
    );
};
