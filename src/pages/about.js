import { Box, Button, Link, Typography, useTheme } from "@mui/material";
import React from "react";
import AboutSection from "../components/about/section";
import AchievementComponent from "../components/about/achievement";
import CheffProfile from "../components/about/cheffProfile";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>About Us | {theme.title}</title>
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
            About Us
          </Typography>
          <Typography fontWeight={"light"} color={"white"} fontSize={"1.1rem"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Typography>
        </Box>
        <AboutSection
          title={"Our History"}
          subTitle={"Going back in time"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          }
          image1={
            "https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress"
          }
          image2={
            "https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress"
          }
        />
        <AboutSection
          direction="row-reverse"
          title={"Our Vision"}
          subTitle={"Looking Ahead"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          }
          image1={
            "https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress"
          }
          image2={
            "https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress"
          }
        />
        <Box
          height={"45vh"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          width={"100%"}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={"10px"}
          >
            <Typography fontWeight={"bold"} fontSize={"1.7rem"}>
              Our Achievements
            </Typography>
            <Typography
              sx={{
                typography: "secondaryFont",
                color: "primary.main",
                fontSize: "2.5rem",
              }}
            >
              Notable Milestones
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-evenly"} width={"90%"}>
            <AchievementComponent>Achievement 1</AchievementComponent>
            <AchievementComponent>Achievement 2</AchievementComponent>
            <AchievementComponent>Achievement 3</AchievementComponent>
            <AchievementComponent>Achievement 4</AchievementComponent>
          </Box>
        </Box>
        <AboutSection
          title={"The Kitchen"}
          subTitle={"The heart of it all"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          }
          image1={
            "https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress"
          }
          image2={
            "https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress"
          }
        />
        <AboutSection
          direction="row-reverse"
          title={"The Bar"}
          subTitle={"A place to unwind"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          }
          image1={
            "https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress"
          }
          image2={
            "https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress"
          }
        />
        <Box
          height={"50vh"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-around"}
          alignItems={"center"}
          width={"100%"}
        >
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography fontWeight={"bold"} fontSize={"1.7rem"}>
              Our Team
            </Typography>
            <Typography
              sx={{
                typography: "secondaryFont",
                color: "primary.main",
                fontSize: "2.5rem",
              }}
            >
              The Masters
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-evenly"} width={"90%"}>
            <CheffProfile
              image={
                "https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              name={"John Doe"}
              title={"Head Chef"}
            />
            <CheffProfile
              image={
                "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              name={"James Doe"}
              title={"Sue Chef"}
            />
            <CheffProfile
              image={
                "https://images.pexels.com/photos/3338675/pexels-photo-3338675.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              name={"Jack Doe"}
              title={"Line Cook"}
            />
          </Box>
        </Box>
        <AboutSection
          title={"Our Shop"}
          subTitle={"Take something to go"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          }
          image1={
            "https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress"
          }
          image2={
            "https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress"
          }
        />
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"10vh"}
        >
          <Link href={"/"}>
            <Button size="large" disableElevation variant="contained">
              Explore
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default AboutPage;
