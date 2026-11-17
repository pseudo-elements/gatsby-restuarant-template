import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";

const ReservationTime = ({ setStage, reservationForm, setReservationForm }) => {
  const [time, setTime] = useState(dayjs(reservationForm.date));
  const isToday =
    reservationForm.date && dayjs(reservationForm.date).isSame(dayjs(), "day");

  const shouldDisableTime = (timeValue, clockType) => {
    if (clockType === "hours") {
      const hour = timeValue.hour();
      return hour < 6 || hour >= 21; // Disable hours outside 6:00 to 21:00
    }
    return false;
  };

  const handleChange = (newTime) => {
    setTime(newTime);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReservationForm((prev) => ({
      ...prev,
      date: time.toISOString(),
    }));
    setStage(3);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "min(400px, 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography fontWeight={"light"}>Select time</Typography>
        <Typography fontSize={"2rem"}>{time.format("HH:mm")}</Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimeClock
          disablePast={isToday}
          ampm={false}
          value={time}
          onChange={handleChange}
          shouldDisableTime={shouldDisableTime}
        />
      </LocalizationProvider>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{ mt: "20px" }}
      >
        <Button variant="outlined" onClick={() => setStage(1)}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </form>
  );
};

export default ReservationTime;
