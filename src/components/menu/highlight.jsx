import {
  Box,
  Link,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FetchWorker from "../../utils/fetchWorker";
import MenuItemCategories from "./categories";
import ProductWorker from "../../utils/productWorker";

const MenuHighlight = ({ currency }) => {
  const theme = useTheme();
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [offers, setOffers] = useState({});
  const productWorker = new ProductWorker();

  useEffect(() => {
    const fetchWorker = new FetchWorker();
    Promise.all([fetchWorker.fetchMenuHighlight(), fetchWorker.fetchOffers()])
      .then((res) => {
        setData(res[0]);
        setOffers(res[1]);
        setIsLoading(false);
      })
      .catch((err) => {});
  }, []);

  return (
    <Box
      width={"100%"}
      minHeight={"50vh"}
      sx={{
        transition: "0.2s",
        ":hover": { bgcolor: theme.palette.grey[200] },
      }}
    >
      {isLoading ? (
        <Skeleton variant="rounded" width={"100%"} height={"50vh"} />
      ) : (
        <Link
          href={`/menu-item/${data.item.id}`}
          style={{
            width: "100%",
            textDecoration: "none",
            color: "black",
            display: "flex",
            gap: "20px",
            flexDirection: isNotPhone ? "row" : "column",
          }}
        >
          <Box
            width={"100%"}
            padding={"20px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
            justifyContent={"space-evenly"}
          >
            <Typography
              variant="h2"
              sx={{ typography: "secondaryFont", color: "primary.main" }}
            >
              {data.title}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={"1.3rem"}>
              {data.item.name}
            </Typography>
            <Typography>{data.item.description}</Typography>
            <MenuItemCategories categories={data.item.categories} />
            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <Typography fontWeight={"bold"} fontSize={"1.2rem"}>
                {currency.symbol}{" "}
                {offers[data.item.id]
                  ? productWorker.getDiscount(
                      data.item.unitPrice,
                      offers[data.item.id]
                    )
                  : data.item.unitPrice}
              </Typography>
              {offers[data.item.id] && (
                <Typography
                  fontSize={"0.9rem"}
                  sx={{
                    color: theme.palette.grey[400],
                    textDecoration: "line-through",
                  }}
                >
                  {currency.symbol}
                  {data.item.unitPrice}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            width={"100%"}
            height={"400px"}
            sx={{
              backgroundImage: `url(${data.item.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
        </Link>
      )}
    </Box>
  );
};

export default MenuHighlight;
