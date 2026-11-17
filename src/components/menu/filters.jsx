import React, { useEffect, useRef, useState } from "react";
import MenuFilter from "./filter";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { FilterList } from "@mui/icons-material";
import SkeletonGroup from "../skeletonGroup";

const MenuFilters = ({
  isLoading,
  categories,
  setIsFilters,
  isFilters,
  filters,
  setFilters,
}) => {
  const theme = useTheme();
  const containerRef = useRef(null);
  const filtersRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [topOffset, setTopOffset] = useState(0);

  const updateTopOffset = () => {
    if (containerRef.current) {
      // Use getBoundingClientRect to get the top relative to the viewport
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setTopOffset(rect.top + scrollTop);
    }
  };

  useEffect(() => {
    // Call the function initially and when window is resized
    updateTopOffset();
    window.addEventListener("resize", updateTopOffset);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateTopOffset);
    };
  }, []);

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Check if the current scroll position is greater than the component's top offset
      if (scrollY > topOffset) {
        setIsFixed(topOffset);
      } else {
        setIsFixed(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topOffset]);

  const handleExpand = () => {
    if (filtersRef.current) {
      setIsFilters((prev) => {
        filtersRef.current.style.height = prev
          ? "55px"
          : filtersRef.current.scrollHeight + "px";
        return !prev;
      });
    }
  };

  return (
    <>
      <Box
        ref={containerRef}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        position={isFixed ? "fixed" : "static"}
        bgcolor={"white"}
        padding={isFixed ? "10px 0px" : "0px"}
        top={81.5}
      >
        <Box
          width={isFixed ? "80%" : "100%"}
          display={"flex"}
          gap={"5px"}
          alignItems={"flex-start"}
        >
          <Box
            ref={filtersRef}
            height={"55px"}
            overflow={"hidden"}
            width={"100%"}
            sx={{ transition: "0.3s" }}
          >
            {isLoading ? (
              <SkeletonGroup
              count={8}
              width={"200px"}
              height={"50px"}
              flexDirection="row"
              flexWrap={"wrap"}
            />
            ) : (
              <Box
                display={"flex"}
                gap={"20px"}
                flexWrap={"wrap"}
                sx={{ transition: "0.3s" }}
              >
                {categories.map((category) => (
                  <MenuFilter
                    {...{
                      category,
                      filters,
                      setFilters,
                      topOffset,
                      isFilters,
                      handleExpand,
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
          <button
            onClick={handleExpand}
            style={{
              marginTop: "2px",
              textTransform: "none",
              fontSize: "initial",
              backgroundColor: "transparent",
              border: "none",
              padding: "none",
              cursor: "pointer",
            }}
          >
            <Box
              display={"flex"}
              padding={"10px"}
              gap={"10px"}
              border={`1px solid ${theme.palette.primary.main}`}
              color={"primary.main"}
              sx={{
                ":hover": {
                  color: "white",
                  bgcolor: "primary.main",
                },
              }}
            >
              <FilterList
                className="filter-icon"
                sx={{
                  transition: "0.3s",
                  transform: `rotate(-${isFilters ? 180 : 0}deg)`,
                }}
              />
              <Typography>Filters</Typography>
            </Box>
          </button>
        </Box>
      </Box>
      {isFixed && <Box height={"55px"} width={"100%"} />}
    </>
  );
};

export default MenuFilters;
