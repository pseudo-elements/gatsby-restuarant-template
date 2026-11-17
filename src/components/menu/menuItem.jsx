import { Box, Link, Menu, Typography, useTheme } from "@mui/material";
import React from "react";
import MenuItemCategories from "./categories";
import ProductWorker from "../../utils/productWorker";

const MenuItem = ({ item, offers, currency }) => {
  const theme = useTheme();
  const productWorker = new ProductWorker();

  return (
    <Link
      href={`/menu-item/${item.id}`}
      width={"min(500px, 100%)"}
      style={{ flexGrow: 1, textDecoration: "none", color: "black" }}
    >
      <Box
        display={"flex"}
        width={"100%"}
        minHeight={"250px"}
        sx={{
          transition: "0.2s",
          ":hover": { bgcolor: theme.palette.grey[200] },
        }}
      >
        <Box
          width={"100%"}
          padding={"10px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          <Typography fontWeight={"bold"} fontSize={"1.2rem"}>
            {item.name}
          </Typography>
          <Typography fontWeight={"light"}>{item.description}</Typography>
          <MenuItemCategories categories={item.categories} />
          <Box display={"flex"} gap={"10px"} alignItems={"center"}>
            <Typography fontWeight={"bold"}>
              {currency.symbol}{" "}
              {offers[item.id]
                ? productWorker.getDiscount(item.unitPrice, offers[item.id])
                : item.unitPrice}
            </Typography>
            {offers[item.id] && (
              <Typography
                fontSize={"0.7rem"}
                sx={{
                  color: theme.palette.grey[400],
                  textDecoration: "line-through",
                }}
              >
                {currency.symbol}
                {item.unitPrice}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          width={"100%"}
          sx={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </Link>
  );
};

export default MenuItem;
