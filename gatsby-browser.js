import React from "react";
import store from "./src/state/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import theme from "./src/theme";
import Layout from "./src/components/layout/primary";
import UserPage from "./src/pages/user";
import "./src/styles/index.css";
import MenuItemPage from "./src/pages/menu-item";
import AddReviewPage from "./src/pages/add-review";
import ShopProductPage from "./src/pages/shop/product";

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {element}
      </ThemeProvider>
    </Provider>
  );
};

export const wrapPageElement = ({ element, props }) => {
  const path = props.location.pathname;

  if (path.startsWith("/shop/product/")) {
    element = <ShopProductPage {...props} />;
  }

  if (path.startsWith("/menu-item")) {
    element = <MenuItemPage {...props} />;
  }

  if (path.startsWith("/user")) {
    element = <UserPage {...props} />;
  }

  if (path.startsWith("/add-review")) {
    element = <AddReviewPage {...props} />;
  }

  return <Layout>{element}</Layout>;
};
