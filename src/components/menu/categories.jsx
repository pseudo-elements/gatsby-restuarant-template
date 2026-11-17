import React from "react";
import { Box, Tooltip } from "@mui/material";
import categoryIcons from "./categoryIcons";
import MenuWorker from "../../utils/menuWorker";

const MenuItemCategories = ({ categories }) => {
  const menuWorker = new MenuWorker();
  return (
    <Box display={"flex"} gap={"10px"} alignItems={"center"}>
      {categories.map((category) => {
        return menuWorker.highlightedCategories.includes(category) ? (
          <Tooltip title={category}>{categoryIcons[category]}</Tooltip>
        ) : (
          <></>
        );
      })}
    </Box>
  );
};

export default MenuItemCategories;
