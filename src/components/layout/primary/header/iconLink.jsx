import { IconButton, Link, Tooltip } from "@mui/material";
import React from "react";

const HeaderIconLink = ({ title, path, children }) => {
  return (
    <Tooltip title={title}>
      <Link href={path}>
        <IconButton
          sx={{
            transition: "0.2s",
            color: "black",
            ":hover": { color: "primary.main" },
          }}
        >
          {children}
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export default HeaderIconLink;
