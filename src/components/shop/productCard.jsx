import { Box, Link, Rating, Typography, useTheme } from "@mui/material";
import React from "react";

const ProductCard = ({ currency, product }) => {
  const theme = useTheme();
  return (
    <Link
      href={`/shop/product/${product.id}`}
      sx={{
        textDecoration: "none",
        color: "black",
        width: "min(250px, 100%)",
        height: "300px",
        ":hover .product-card-image": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Box
        width={"100%"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        sx={{
          ":hover": {
            bgcolor: theme.palette.grey[200],
          },
        }}
      >
        <Box width={"100%"} height={"100%"} overflow={"hidden"}>
          <Box
            className="product-card-image"
            width={"100%"}
            height={"100%"}
            element="img"
            sx={{
              transition: "0.3s",
              backgroundImage: `url(${product.images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"5px"}
          padding={"10px 0px"}
        >
          <Typography fontSize={"1.1rem"}>{product.name}</Typography>
          <Rating size={"small"} value={product.rating.score} readOnly />
          <Typography fontWeight={"light"}>
            {currency.symbol}
            {product.unitPrice}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
