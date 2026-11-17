import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const ReservationDate = ({ setStage, setReservationForm }) => {
  const [date, setDate] = useState(dayjs());
  const [isTooLate, setIsTooLate] = useState(false);

  useEffect(() => {
    let today = dayjs();
    if (today.hour() >= 21 || today.hour() < 6) {
      today = today.add(1, "day");
      today = today.set("hour", 6);
      setIsTooLate(true);
    }
    setDate(today);
  }, []);

  const shouldDisableDate = (day) => {
    if (isTooLate) {
      return dayjs(day).isBefore(dayjs().add(1, "day"), "day");
    }
    return false;
  };

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReservationForm((prev) => ({
      ...prev,
      date: date.toISOString(),
    }));
    setStage(2);
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
        <Typography fontWeight={"light"}>Select date</Typography>
        <Typography fontSize={"2rem"}>
          {date.format("ddd, D MMM YYYY")}
        </Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          shouldDisableDate={shouldDisableDate}
          value={date}
          onChange={handleChange}
          disablePast
        />
      </LocalizationProvider>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button variant="outlined" onClick={() => setStage(0)}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </form>
  );
};

export default ReservationDate;
