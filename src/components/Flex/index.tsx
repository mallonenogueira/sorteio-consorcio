import classNames from "classnames";
import React from "react";

import "./style.scss";

export function Flex({ children, gap, direction, justifyContent, alignItems }) {
  return (
    <div
      className={classNames("container-flex", {
        "container-flex--direction-column ": direction === "column",
        "container-flex--justify-content-center": justifyContent,
        "container-flex--justify-content-end": justifyContent === "flex-end",
        "container-flex--justify-content-start":
          justifyContent === "flex-start",
        "container-flex--justify-content-space-between":
          justifyContent === "space-between",
        "container-flex--justify-content-space-around":
          justifyContent === "space-around",
        "container-flex--align-items-center": alignItems === "center",
        "container-flex--align-items-end": alignItems === "flex-end",
        "container-flex--align-items-start": alignItems === "flex-start",
      })}
      style={{
        gap: gap,
      }}
    >
      {children}
    </div>
  );
}
