import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import FetchWorker from "../../utils/fetchWorker";
import ShopHightlightItem from "./hightlightItem";

const ShopHighlights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchworker = new FetchWorker();
    fetchworker
      .fetchShopHighlights()
      .then((res) => {
        setHighlights(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box
      width={"100%"}
      display={"flex"}
      gap={"20px"}
      padding={"20px"}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
    >
      {isLoading ? (
        <Skeleton width={"100%"} height={"60vh"} />
      ) : (
        highlights.map((highlight) => <ShopHightlightItem {...highlight} />)
      )}
    </Box>
  );
};

export default ShopHighlights;
