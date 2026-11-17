import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import StatusComponent from "../components/status";
import RecieptVerification from "../components/addReview/recieptVerification";
import ItemReview from "../components/addReview/review";
import ItemSelect from "../components/addReview/select";
import { useSelector } from "react-redux";
import { navigate } from "gatsby";
import VerificationWorker from "../utils/verificationWorker";
import FetchWorker from "../utils/fetchWorker";
import { Helmet } from "react-helmet";

const AddReviewPage = ({ location }) => {
  const theme = useTheme();
  const searchParams = new URLSearchParams(location.search);
  const fetchWorker = new FetchWorker();
  const user = useSelector((state) => state.user);
  const currency = useSelector((state) => state.currency);
  const [status, setStatus] = useState({ on: false });
  const [recieptItemIds, setRecieptItemIds] = useState();
  const [recieptItems, setRecieptItems] = useState();
  const [reviewItem, setReviewItem] = useState();

  const item = searchParams.get("item");
  const [stage, setStage] = useState(0);

  const stages = [
    <RecieptVerification item={item} />,
    <ItemSelect {...{ recieptItems, setStatus, currency }} />,
    <ItemReview {...{ user, reviewItem, currency, setStatus }} />,
  ];

  useEffect(() => {
    setStatus({ on: true, type: "LOADING" });
    if (!user.isFetching) {
      setStatus({ on: false });
      if (!user.isLoggedIn) {
        setStatus({
          on: true,
          type: "INFO",
          title: "One moment",
          message: "You need to be logged in to add a review",
          action: () => {
            navigate(`/auth/login`);
          },
          actionTitle: "Login",
        });
      }
    }
  }, [user]);

  useEffect(() => {
    const [recieptID] = location.pathname.split("/").slice(2);
    if (recieptID) {
      const verificationWorker = new VerificationWorker();
      setStatus({
        on: true,
        type: "LOADING",
        message: "Verifying reciept",
      });
      verificationWorker
        .verifyRecieptId(recieptID)
        .then((res) => {
          setStatus({ on: false });
          if (res) {
            setRecieptItemIds(res);
          } else {
            setStatus({
              on: true,
              type: "ERROR",
              message: "Reciept not found",
              action: navigateHome,
            });
          }
        })
        .catch((err) => {
          setStatus({
            on: true,
            type: "ERROR",
            message: err.message,
            action: navigateHome,
          });
        });
    }
  }, []);

  useEffect(() => {
    if (recieptItemIds) {
      if (item) {
        if (recieptItemIds.includes(item)) {
          setStage(2);
          setStatus({
            on: true,
            type: "LOADING",
            message: "loading item details",
          });
          fetchWorker
            .fetchMenuItem(item)
            .then((fetchedItem) => {
              setReviewItem(fetchedItem);
              setStatus({ on: false });
            })
            .catch((err) => {
              setStatus({
                on: true,
                type: "ERROR",
                message: `Error loading item details: ${err.message}`,
                action: navigateHome,
              });
            });
        } else {
          navigate(`${location.pathname}`);
          setStatus({ on: true, type: "LOADING" });
          setStatus({
            on: true,
            type: "ERROR",
            message: "Item not found in reciept",
            action: navigateHome,
          });
        }
      } else {
        setStage(1);
        setStatus({
          on: true,
          type: "LOADING",
          message: "loading reciept items",
        });
        fetchWorker
          .fetchItems(recieptItemIds)
          .then((fetchedItems) => {
            setRecieptItems(fetchedItems);
            setStatus({ on: false });
          })
          .catch((err) => {
            setStatus({
              on: true,
              type: "ERROR",
              message: `Error loading reciept items: ${err.message}`,
              action: navigateHome,
            });
          });
      }
    }
  }, [recieptItemIds, item]);

  const navigateHome = () => {
    navigate(`/add-review${location.search}`);
  };

  return (
    <>
      <Helmet>
        <title>Add a review | {theme.title}</title>
        <meta
          name="description"
          content="Add a review for an item you purchased"
        />
      </Helmet>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography
          variant="h1"
          fontSize={"clamp(1rem, 10vw, 2rem)"}
          fontWeight={"bold"}
        >
          Add a review
        </Typography>
        <Box
          width={"100%"}
          height={"80vh"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Box
            border={`1px solid ${theme.palette.grey[400]}`}
            width={"min( 500px, 90%)"}
            height={status.on ? "600px" : undefined}
            position={"relative"}
          >
            {status.on && (
              <StatusComponent {...{ status, setStatus }} isAbsolute />
            )}
            <Box width={"100%"} height={"100%"} padding={"20px"}>
              {stages[stage]}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddReviewPage;
