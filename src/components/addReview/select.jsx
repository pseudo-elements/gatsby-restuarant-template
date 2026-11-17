import {
  Box,
  IconButton,
  Link,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { navigate } from "gatsby";
import { ChevronLeft, Edit } from "@mui/icons-material";
import SkeletonGroup from "../skeletonGroup";

const ItemSelect = ({ recieptItems, currency }) => {
  const theme = useTheme();

  const handleBack = () => {
    navigate(`/add-review${window.location.search}`);
  };

  const handleClick = (item) => {
    navigate(`${window.location.pathname}?item=${item.id}`);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
      <Box display={"flex"} justifyContent={"center"} position={"relative"}>
        <IconButton sx={{ position: "absolute", left: 0 }} onClick={handleBack}>
          <ChevronLeft />
        </IconButton>
        <Typography fontWeight={"bold"} fontSize={"1.3rem"}>
          Purchased Items
        </Typography>
      </Box>
      {recieptItems ? (
        recieptItems.map((item) => {
          return (
            <button
              onClick={() => handleClick(item)}
              style={{
                textDecoration: "none",
                color: "black",
                textTransform: "none",
                fontSize: "initial",
                padding: "0px",
                margin: "none",
                backgroundColor: "transparent",
                textAlign: "left",
                border: "none",
              }}
            >
              <Box
                display={"flex"}
                gap={"20px"}
                padding={"10px"}
                border={`1px solid ${theme.palette.grey[400]}`}
                sx={{
                  transition: "0.3s",
                  ":hover": {
                    border: `1px solid ${theme.palette.primary.main}`,
                    bgcolor: theme.palette.grey[200],
                  },
                }}
              >
                <img
                  alt={`reciept item-${item.name}`}
                  src={item.image}
                  loading="lazy"
                  style={{ width: "50px", height: "50px" }}
                />
                <Box display={"flex"} flexDirection={"column"} width={"100%"}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography>{item.name}</Typography>
                  </Box>
                  <Rating value={item.rating.score} readOnly size="small" />
                  <Typography fontWeight={"light"}>
                    {currency.symbol}
                    {item.unitPrice}
                  </Typography>
                </Box>
              </Box>
            </button>
          );
        })
      ) : (
        <SkeletonGroup count={4} width={"100%"} height={"50px"} />
      )}
    </Box>
  );
};

export default ItemSelect;
