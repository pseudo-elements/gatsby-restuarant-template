import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";

const UserPage = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>Shop Cart | {theme.title}</title>
        <meta name="description" content="Learn About Us" />
      </Helmet>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Box
          position={"relative"}
          width={"100%"}
          height={"55vh"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          overflow={"hidden"}
        >
          <Box
            zIndex={-1}
            position={"absolute"}
            width={"100%"}
            height={"100%"}
            sx={{
              backgroundImage: `url(https://images.pexels.com/photos/15200485/pexels-photo-15200485/free-photo-of-sunny-side-up-eggs-on-the-plate.jpeg)`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              filter: "blur(3px) brightness(0.6)",
              transform: "scale(1.1)",
            }}
          />
          <Typography
            sx={{
              typography: "secondaryFont",
              fontSize: "clamp(3rem, 20vw, 5rem)",
              color: "primary.main",
            }}
          >
            Cart
          </Typography>
          <Typography fontWeight={"light"} color={"white"} fontSize={"1.1rem"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Typography>
        </Box>
        <Box
          height={"45vh"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          width={"100%"}
        >
            <Typography fontWeight={"bold"} fontSize={"1.7rem"}>
              Page Under Construction
              </Typography>
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
