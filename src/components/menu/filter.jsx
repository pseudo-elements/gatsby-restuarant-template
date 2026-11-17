import React from "react";
import { Cancel } from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import categoryIcons from "./categoryIcons";

const MenuFilter = ({
  topOffset,
  category,
  filters,
  setFilters,
  isFilters,
  handleExpand,
}) => {
  const theme = useTheme();
  const isFilter = filters.includes(category);

  const handleSelect = () => {
    window.scrollTo(0, topOffset);
    if (!isFilter) {
      setFilters((prev) => [...prev, category]);
    } else {
      setFilters((prev) => prev.filter((filter) => filter !== category));
    }
    if (isFilters) {
      handleExpand();
    }
  };

  return (
    <button
      onClick={handleSelect}
      style={{
        textTransform: "none",
        fontSize: "initial",
        backgroundColor: "transparent",
        border: "none",
        padding: "none",
        cursor: "pointer",
      }}
    >
      <Box
        border={`1px solid ${
          isFilter ? theme.palette.primary.main : theme.palette.grey[300]
        }`}
        display={"flex"}
        alignItems={"center"}
        gap={"10px"}
        padding={"10px"}
        sx={{
          transition: "0.2s",
          ":hover": {
            border: `1px solid ${theme.palette.grey[400]}`,
          },
        }}
      >
        {isFilter && <Cancel sx={{ color: "primary.main" }} />}
        <Typography>
          {category.charAt(0).toUpperCase() + category.substring(1)}
        </Typography>
        <Typography>{categoryIcons[category]}</Typography>
      </Box>
    </button>
  );
};

export default MenuFilter;
