import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import ContactInfo from "../components/reservation/contactInfo";
import ReservationDate from "../components/reservation/date";
import ReservationTime from "../components/reservation/time";
import ReservationDetails from "../components/reservation/details";
import ReservationSummary from "../components/reservation/summary";
import { Helmet } from "react-helmet";
import StatusComponent from "../components/status";

const ReservationPage = () => {
  const theme = useTheme();
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const [reservationForm, setReservationForm] = useState({});
  const [status, setStatus] = useState({ on: false });
  const [stage, setStage] = useState(0);

  const stages = [
    <ContactInfo {...{ setStage, setReservationForm }} />,
    <ReservationDate {...{ setStage, setReservationForm }} />,
    <ReservationTime {...{ setStage, reservationForm, setReservationForm }} />,
    <ReservationDetails {...{ setStage, setReservationForm }} />,
    <ReservationSummary
      {...{ setStatus, setStage, reservationForm, setReservationForm }}
    />,
  ];

  return (
    <>
      <Helmet>
        <title>Make a Reservation | {theme.title}</title>
        <meta
          name="description"
          content="Make a reservation at our restaurant"
        />
      </Helmet>
      <Box
        width={"100%"}
        height={"100vh"}
        position={"relative"}
        display={"flex"}
        justifyContent={"center"}
      >
        <img
          src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="reservation page"
          loading="lazy"
          width={"100%"}
          height={"100%"}
          style={{ position: "absolute", zIndex: -1 }}
        />
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          height={"100%"}
          width={isNotPhone ? "80%" : "90%"}
        >
          <Box
            width={"min(600px, 100%)"}
            height={"600px"}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            position={"relative"}
            bgcolor={"white"}
          >
            {status.on && (
              <StatusComponent {...{ status, setStatus }} isAbsolute />
            )}
            <Typography
              variant="h2"
              fontSize={"clamp(1rem, 10vw, 3rem)"}
              mt={"50px"}
              sx={{
                typography: "secondaryFont",
                color: "primary.main",
                lineHeight: "30px",
              }}
            >
              Make a Reservation
            </Typography>
            <Box
              padding={"10px"}
              height={"100%"}
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {stages[stage]}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReservationPage;
