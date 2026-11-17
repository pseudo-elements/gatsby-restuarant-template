import { AccessAlarm, EditCalendar, TableBar } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers/icons";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import VerificationWorker from "../../utils/verificationWorker";
import { navigate } from "gatsby";

const ReservationSummary = ({ setStatus, setStage, reservationForm }) => {
  useEffect(() => {}, [reservationForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const verificationWorker = new VerificationWorker();
    setStatus({ on: true, type: "LOADING", message: "Making reservation" });

    verificationWorker
      .verifyReservation(reservationForm)
      .then((res) => {
        console.log(res);
        setStatus({
          on: true,
          type: "SUCCESS",
          message: "Reservation made",
          action: () => {
            navigate("/");
          },
        });
      })
      .catch((err) => {
        setStatus({
          on: true,
          type: "ERROR",
          message: err.message,
          action: () => setStage(0),
        });
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        height: "100%",
        width: "min(400px, 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"10px"}
        fontWeight={"bold"}
      >
        <Avatar />
        {reservationForm.name}
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              fontWeight={"bold"}
              display={"flex"}
              alignItems={"center"}
              gap={"10px"}
            >
              <CalendarIcon />
              Date
            </Typography>
            <Typography>
              {new Date(reservationForm.date).toDateString()}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              fontWeight={"bold"}
              display={"flex"}
              alignItems={"center"}
              gap={"10px"}
            >
              <AccessAlarm />
              Time
            </Typography>
            <Typography>
              {dayjs(reservationForm.date).format("h:mm a")}
            </Typography>
          </Box>
        </Box>
        {reservationForm.occasion && (
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              fontWeight={"bold"}
              display={"flex"}
              alignItems={"center"}
              gap={"10px"}
            >
              <EditCalendar />
              Occasion
            </Typography>
            <Typography>{reservationForm.occasion}</Typography>
          </Box>
        )}
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography
            fontWeight={"bold"}
            display={"flex"}
            alignItems={"center"}
            gap={"10px"}
          >
            <TableBar />
            Table for
          </Typography>
          <Typography>{reservationForm.tableSize}</Typography>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button variant="outlined" onClick={() => setStage(3)}>
          back
        </Button>
        <Button type="submit" variant="contained">
          Confirm
        </Button>
      </Box>
    </form>
  );
};

export default ReservationSummary;
