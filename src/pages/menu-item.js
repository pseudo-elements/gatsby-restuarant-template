import React, { useEffect, useState } from "react";
import FetchWorker from "../utils/fetchWorker";
import {
  Box,
  Button,
  Link,
  Rating,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Helmet } from "react-helmet";
import MenuItemCategories from "../components/menu/categories";
import ProductWorker from "../utils/productWorker";
import { useSelector } from "react-redux";
import SkeletonGroup from "../components/skeletonGroup";
import MenuItem from "../components/menu/menuItem";
import MenuItemReview from "../components/product/review";
import { PersonOff } from "@mui/icons-material";
import { navigate } from "gatsby";

const MenuItemPage = ({ location }) => {
  const theme = useTheme();
  const currency = useSelector((state) => state.currency);
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const productWorker = new ProductWorker();
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState({});
  const [menuItem, setMenuItem] = useState({});
  const [similartItems, setSimilarItems] = useState([]);

  useEffect(() => {
    const [id] = location.pathname.split("/").slice(2);

    if (!id) {
      navigate("/404");
    }

    const fetchWorker = new FetchWorker();

    Promise.all([fetchWorker.fetchOffers(), fetchWorker.fetchMenuItem(id)])
      .then((res) => {
        setOffers(res[0]);
        if (!Object.keys(res[1]).length) {
          navigate("/404");
        }
        setMenuItem(res[1]);
        fetchWorker.searchMenu(res[1].categories[0], 4).then((items) => {
          setSimilarItems(items);
          setIsLoading(false);
        });
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {menuItem.name || ""} | {theme.title}
        </title>
        <meta name="description" content={menuItem.description} />
      </Helmet>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          width={isNotPhone ? "80%" : "90%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          <Box display={"flex"} gap={"50px"}>
            {isLoading ? (
              <Skeleton width={"100%"} height={"60vh"} variant="rounded" />
            ) : (
              <Box
                width={"100%"}
                height={"70vh"}
                sx={{
                  backgroundImage: `url(${menuItem.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            )}
            <Box
              height={"100%"}
              width={"90%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              gap={"20px"}
            >
              {isLoading ? (
                <SkeletonGroup count={5} width={"100%"} height={"50px"} />
              ) : (
                <>
                  <Typography
                    variant="h2"
                    sx={{ typography: "secondaryFont", color: "primary.main" }}
                  >
                    {menuItem.name}
                  </Typography>
                  <Typography>{menuItem.description}</Typography>
                  <MenuItemCategories categories={menuItem.categories} />
                  {menuItem.allergens.length && (
                    <Box>
                      <Typography fontWeight={"bold"}>
                        Allergen advice:
                      </Typography>
                      <Typography fontWeight={"light"}>
                        Contains{" "}
                        {menuItem.allergens.length > 1
                          ? menuItem.allergens.slice(0, -1).join(", ") +
                            " and " +
                            menuItem.allergens.slice(-1)
                          : menuItem.allergens[0]}
                      </Typography>
                    </Box>
                  )}
                  <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                    <Typography fontWeight={"bold"} fontSize={"1.2rem"}>
                      {currency.symbol}{" "}
                      {offers[menuItem.id]
                        ? productWorker.getDiscount(
                            menuItem.unitPrice,
                            offers[menuItem.id]
                          )
                        : menuItem.unitPrice}
                    </Typography>
                    {offers[menuItem.id] && (
                      <Typography
                        fontSize={"0.9rem"}
                        sx={{
                          color: theme.palette.grey[400],
                          textDecoration: "line-through",
                        }}
                      >
                        {currency.symbol}
                        {menuItem.unitPrice}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Button size="large" variant="outlined">
                      Share
                    </Button>
                    <Link>
                      <Button size="large" disableElevation variant="contained">
                        Make a Reservation
                      </Button>
                    </Link>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Typography
            padding={"30px"}
            sx={{
              typography: "secondaryFont",
              color: "primary.main",
              fontSize: "clamp(1rem, 10vw, 3rem)",
              textAlign: "center",
            }}
          >
            Reviews
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            border={`1px solid ${theme.palette.grey[400]}`}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              padding={"20px"}
              borderBottom={`1px solid ${theme.palette.grey[400]}`}
              position={"relative"}
            >
              {isLoading ? (
                <SkeletonGroup
                  count={3}
                  width={"100px"}
                  height={"40px"}
                  flexDirection="row"
                />
              ) : (
                <>
                  {menuItem.rating.score && (
                    <Box display={"flex"} gap={"10px"}>
                      <Rating value={menuItem.rating.score} readOnly />
                      <Box display={"flex"} gap={"5px"}>
                        <Typography fontWeight={"bold"}>
                          {menuItem.rating.score}
                        </Typography>
                        <Typography fontWeight={"light"}>
                          (
                          {Number(menuItem.rating.votes.length).toLocaleString(
                            "US"
                          )}{" "}
                          vote
                          {menuItem.rating.votes.length === 1 ? "" : "s"})
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"1.2rem"}
                    sx={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {Number(menuItem.reviews.length).toLocaleString("US")}{" "}
                    review
                    {menuItem.reviews.length === 1 ? "" : "s"}
                  </Typography>
                  <Link href={`/add-review?item=${menuItem.id}`}>
                    <Button disableElevation variant="contained">
                      Add a review
                    </Button>
                  </Link>
                </>
              )}
            </Box>
            {isLoading ? (
              <Skeleton width={"100%"} height={"60vh"} variant="rounded" />
            ) : (
              <Box
                height={"60vh"}
                sx={{
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    bgcolor: "transparent",
                    width: "7px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: theme.palette.grey[300],
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    cursor: "pointer",
                    bgcolor: theme.palette.grey[400],
                  },
                }}
              >
                {menuItem.reviews.length ? (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"20px"}
                    padding={"20px"}
                  >
                    {menuItem.reviews.map((review) => (
                      <MenuItemReview {...{ review }} />
                    ))}
                  </Box>
                ) : (
                  <Box
                    width={"100%"}
                    height={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <PersonOff />
                    <Typography>No reviews yet</Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
          {Boolean(menuItem.categories) && (
            <Typography
              padding={"30px"}
              sx={{
                typography: "secondaryFont",
                color: "primary.main",
                fontSize: "clamp(1rem, 10vw, 3rem)",
                textAlign: "center",
              }}
            >
              More in {menuItem.categories[0]}
            </Typography>
          )}
          <Box
            width={"100%"}
            padding={"20px 0px"}
            display={"flex"}
            justifyContent={"space-between"}
            gap={"20px"}
            flexWrap={"wrap"}
          >
            {similartItems.map((item) => (
              <MenuItem {...{ item, currency, offers }} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MenuItemPage;
