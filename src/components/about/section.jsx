import { Box, Button, Link, Typography } from "@mui/material";
import React from "react";

const AboutSection = ({
  direction = "row",
  title,
  subTitle,
  description,
  image1,
  image2,
}) => {
  return (
    <Box minHeight={"80vh"} display={"flex"} justifyContent={"center"}>
      <Box
        width={"min(1000px, 90%)"}
        display={"flex"}
        alignItems={"center"}
        flexDirection={direction}
        gap={"20px"}
      >
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography
              fontWeight={"bold"}
              fontSize={"2rem"}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                typography: "secondaryFont",
                color: "primary.main",
                fontSize: "2.5rem",
              }}
            >
              {subTitle}
            </Typography>
          </Box>
          <Typography textAlign={"center"} fontWeight={"light"}>
            {description}
          </Typography>
        </Box>
        <Box width={"100%"} height={"400px"} display={"flex"} gap={"20px"}>
          <Box
            width={"100%"}
            height={"100%"}
            sx={{
              backgroundImage: `url(${image1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Box
            width={"100%"}
            height={"100%"}
            sx={{
              backgroundImage: `url(${image2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AboutSection;
