import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import MenuHighlight from "../components/menu/highlight";
import MenuWorker from "../utils/menuWorker";
import FetchWorker from "../utils/fetchWorker";
import MenuItem from "../components/menu/menuItem";
import MenuFilters from "../components/menu/filters";
import SkeletonGroup from "../components/skeletonGroup";

const MenuPage = () => {
  const menuWorker = new MenuWorker();
  const theme = useTheme();
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const currency = useSelector((state) => state.currency);
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState({});
  const [filters, setFilters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(null);
  const [menu, setMenu] = useState(null);
  const [isFilters, setIsFilters] = useState(false);

  useEffect(() => {
    const fetchworker = new FetchWorker();
    Promise.all([fetchworker.fetchMenu(), fetchworker.fetchOffers])
      .then((res) => {
        setData(res[0]);
        setOffers(res[1]);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (data) {
      setMenu(menuWorker.filter(data, filters));
    }
  }, [data, filters]);

  useEffect(() => {
    if (menu) {
      setIsLoading(false);
      setCategories(menuWorker.parseCategories(menu, filters));
    } else {
      setIsLoading(true);
    }
  }, [menu, filters]);

  return (
    <>
      <Helmet>
        <title>Our Menu | {theme.title}</title>
        <meta name="description" content="Discover our menu" />
      </Helmet>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          width={isNotPhone ? "80%" : "90%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"20px"}
        >
          <MenuHighlight currency={currency} />
          <Box display={"flex"} justifyContent={"center"} padding={"40px"}>
            <Typography
              sx={{
                typography: "secondaryFont",
                color: "primary.main",
                fontSize: "clamp(1rem, 10vw, 3rem)",
              }}
            >
              Explore our Menu
            </Typography>
          </Box>
          <MenuFilters
            {...{
              isLoading,
              categories,
              setIsFilters,
              isFilters,
              filters,
              setFilters,
            }}
          />
          {isLoading ? (
            <SkeletonGroup
              count={8}
              width={"min(500px, 100%)"}
              height={"300px"}
              flexDirection="row"
              flexWrap={"wrap"}
              style={{ flexgrow: 1 }}
            />
          ) : (
            <Box
              width={"100%"}
              padding={"20px 0px"}
              display={"flex"}
              justifyContent={"space-between"}
              gap={"20px"}
              flexWrap={"wrap"}
            >
              {menu.map((item) => (
                <MenuItem {...{ item, currency, offers }} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MenuPage;
