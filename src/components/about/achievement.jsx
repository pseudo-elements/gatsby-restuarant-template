import { EmojiEvents } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const AchievementComponent = ({ children }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={"10px"}
    >
      <EmojiEvents sx={{ color: "primary.main", fontSize:"3rem" }} />
      <Typography fontWeight={"light"}>{children}</Typography>
    </Box>
  );
};

export default AchievementComponent;
