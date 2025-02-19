import React from "react";
import './Box.css';

export const Box = ({ ...props }) => {
    return <div className="box">{props.children}</div>
}