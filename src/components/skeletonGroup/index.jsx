import { Box, Skeleton } from "@mui/material";
import React from "react";

const SkeletonGroup = ({
  count,
  variant = "rounded",
  width,
  height,
  flexDirection = "column",
  flexWrap,
  style,
}) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      justifyContent={"space-between"}
      gap={"20px"}
    >
      {Array.from({ length: count }).map(() => (
        <Box {...{ width, height }} sx={style}>
          <Skeleton width={"100%"} height={"100%"} variant={variant} />
        </Box>
      ))}
    </Box>
  );
};

export default SkeletonGroup;
