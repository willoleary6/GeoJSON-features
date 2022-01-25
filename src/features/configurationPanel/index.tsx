import React from "react";
import { useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import "./ConfigurationPanel.css";
import { selectConfiguration } from "../../slices/configurationSlice";

export const ConfigurationPanel = (): JSX.Element => {
    const configSettings = useAppSelector(selectConfiguration);
    const themeConfigBox = useRef<HTMLDivElement>(null);

    const toggleConfigBox = () => {
        themeConfigBox.current?.classList.toggle("show");
    };
    return (
        <div className="theme-config">
            <div className="theme-config-box" ref={themeConfigBox}>
                <div className="spin-icon" onClick={toggleConfigBox}>
                    <i className="fa fa-sliders"></i>
                </div>
                <div className="skin-settings">
                    <div className="title">
                        Configuration <br />
                    </div>
                </div>
                {Object.keys(configSettings).map((configSetting, index) => {
                    return (
                        <div key={index} className="setings-item">
                            <div className="switch">
                                <span>{configSetting}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
