import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../state/user";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Link,
  ListItemIcon,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import HeaderLink from "./link";
import {
  BookmarkAdded,
  Favorite,
  NotificationsSharp,
} from "@mui/icons-material";

const HeaderMenu = ({ menu = "nav", user, setConfirmationModal }) => {
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  const handleLogout = () => {
    setConfirmationModal({
      on: true,
      message: "Are you sure you want to logout?",
      onConfirm: () => {
        dispatch(logoutUser());
      },
      onCancel: () => {},
    });
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.style.height = menu
        ? `${menuRef.current.offsetHeight}px`
        : "0px";
    }
  }, [menu]);

  return (
    <Paper
      elevation={3}
      ref={menuRef}
      sx={{
        height: "400px",
        position: "absolute",
        right: 0,
        top: "100%",
        transformOrigin: "top",
        padding: menu ? "20px" : "0px 20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        transition: "0.3s ease-in-out",
      }}
    >
      {menu === "user" ? (
        user.isLoggedIn ? (
          <>
            <Link
              href={"/user/profile"}
              sx={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <MenuItem sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <Avatar sx={{ fontSize: "15px" }} />
                  <Typography fontWeight={"bold"} fontSize={"1.2rem"}>
                    {user.data.name.first} {user.data.name.last}
                  </Typography>
                </Box>
                <Typography fontSize={"0.5rem"} color={"text.secondary"}>
                  logged in
                </Typography>
              </MenuItem>
            </Link>
            <Link
              href={"/user/notifications"}
              sx={{
                textDecoration: "none",
                color: "black",
                ":hover": { color: "primary.main" },
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <Badge
                    color="primary"
                    variant="dot"
                    overlap="circular"
                    invisible={!user.data.notifications.new}
                  >
                    <NotificationsSharp />
                  </Badge>
                </ListItemIcon>
                My Notifications
              </MenuItem>
            </Link>
            <Link
              href={"/user/orders"}
              sx={{
                textDecoration: "none",
                color: "black",
                ":hover": { color: "primary.main" },
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <BookmarkAdded />
                </ListItemIcon>
                My Orders
              </MenuItem>
            </Link>
            <Link
              href={"/user/favourites"}
              sx={{
                textDecoration: "none",
                color: "black",
                ":hover": { color: "primary.main" },
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                My Favourites
              </MenuItem>
            </Link>
            <Divider sx={{ width: "300px" }} />
            <Button
              onClick={handleLogout}
              sx={{ alignSelf: "center" }}
              disableElevation
              variant="contained"
            >
              Logout
            </Button>
          </>
        ) : (
          <Box display={"flex"} gap={"20px"}>
            <Link href={`/auth/register?tab=${window.location.pathname}`}>
              <Button variant="outlined">Register</Button>
            </Link>
            <Link href={`/auth/login?tab=${window.location.pathname}`}>
              <Button variant="contained" disableElevation>
                login
              </Button>
            </Link>
          </Box>
        )
      ) : (
        menu === "nav" && (
          <Box
            width={"300px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"20px"}
          >
            <MenuItem>
              <HeaderLink path={"/"}>Home</HeaderLink>
            </MenuItem>
            <MenuItem>
              <HeaderLink path={"/about"}>About</HeaderLink>
            </MenuItem>
            <MenuItem>
              <HeaderLink path={"/menu"}>Menu</HeaderLink>
            </MenuItem>
            <MenuItem>
              <HeaderLink>Contact</HeaderLink>
            </MenuItem>
          </Box>
        )
      )}
    </Paper>
  );
};

export default HeaderMenu;
