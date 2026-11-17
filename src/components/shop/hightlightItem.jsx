import { Box, Button, Link, Typography, useTheme } from "@mui/material";
import React from "react";

const ShopHightlightItem = ({ title, description, image, action }) => {
  const theme = useTheme();

  return (
    <Link
      href={action.url}
      sx={{
        height: "250px",
        flexGrow: 1,
        width: "min(400px, 100%)",
        textDecoration: "none",
        color: "black",
        ":hover": {
          bgcolor: theme.palette.grey[200],
        },
        ":hover .shop-highlight-item-image": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Box display={"flex"} width={"100%"} height={"100%"}>
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"flex-start"}
          gap={"20px"}
        >
          <Typography
            fontSize={"1.3rem"}
            sx={{
              typography: "secondaryFont",
              fontSize: "2rem",
              color: "primary.main",
            }}
          >
            {title}
          </Typography>
          <Typography>{description}</Typography>
          <Button variant="outlined">{action.title}</Button>
        </Box>
        <Box width={"100%"} height={"100%"} overflow={"hidden"}>
          <Box
            className={"shop-highlight-item-image"}
            width={"100%"}
            height={"100%"}
            sx={{
              transition: "transform 0.3s",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>
      </Box>
    </Link>
  );
};

export default ShopHightlightItem;
