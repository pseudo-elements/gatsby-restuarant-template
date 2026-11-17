import { Avatar, Box, Rating, Typography, useTheme } from "@mui/material";
import React from "react";

const ProductReview = ({ review }) => {
  const theme = useTheme();
  const date = new Date(review.date);
  return (
    <Box
      boxShadow={`0px 0px 10px 0px ${theme.palette.grey[400]}`}
      padding={"10px"}
      display={"flex"}
      flexDirection={"column"}
      gap={"10px"}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} alignItems={"center"} gap={"10px"}>
          <Avatar sizes="small" />
          <Typography>{review.author}</Typography>
        </Box>
        <Rating value={review.rating} readOnly />
      </Box>
      <Typography fontWeight={"bold"}>{review.title}</Typography>
      <Typography padding={"10px"}>{review.comment}</Typography>
      <Typography fontWeight={"light"}>{date.toDateString()}</Typography>
    </Box>
  );
};

export default ProductReview;
