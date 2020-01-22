import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default ({
  children,
  onClick,
  tooltipTitle,
  buttonClassName,
  tooltipClassName
}) => {
  return (
    <Tooltip title={tooltipTitle} className={tooltipClassName} placement="top">
      <IconButton onClick={onClick} className={buttonClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
};
