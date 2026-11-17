import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import FetchWorker from "../../utils/fetchWorker";
import ShopWorker from "../../utils/shopWorker";
import ProductCard from "../../components/shop/productCard";
import { useSelector } from "react-redux";
import ShopHighlights from "../../components/shop/highlights";
import SkeletonGroup from "../../components/skeletonGroup";

const ShopPage = () => {
  const theme = useTheme();
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const currency = useSelector((state) => state.currency);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState();

  useEffect(() => {
    const shopWorker = new ShopWorker();
    const fetchworker = new FetchWorker();
    fetchworker
      .fetchProducts()
      .then((res) => {
        setProducts(shopWorker.parseShopProducts(res));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Shop | {theme.title}</title>
      </Helmet>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={isNotPhone ? "70%" : "90%"}
          gap={"30px"}
        >
          <ShopHighlights />
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            {isLoading ? (
              <SkeletonGroup
                count={8}
                width={"min(250px, 100%)"}
                height={"300px"}
                flexWrap={"wrap"}
                flexDirection={"row"}
              />
            ) : (
              Object.keys(products).map((category) => (
                <>
                  <Typography
                    sx={{
                      typography: "secondaryFont",
                      fontSize: "2rem",
                      color: "primary.main",
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
                  <Box display={"flex"} flexWrap={"wrap"} gap={"20px"}>
                    {products[category].map((product) => (
                      <ProductCard {...{ product, currency }} />
                    ))}
                  </Box>
                </>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ShopPage;
