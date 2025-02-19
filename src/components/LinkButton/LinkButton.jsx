import React from "react";
import "./LinkButton.css";
export const LinkButton = ({ href, text, download }) => {
  return (
    <a className="button" href={href} download={download}>
      {text}
    </a>
  );
};
