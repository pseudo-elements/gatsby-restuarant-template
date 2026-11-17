import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ReservationDetails = ({ setStage, setReservationForm }) => {
  const [form, setForm] = useState({ tableSize: 2 });

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReservationForm((prev) => ({ ...prev, ...form }));
    setStage(4)
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
      <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
        <Typography fontWeight={"light"}>Occasion</Typography>
        <TextField
          name="occasion"
          placeholder="e.g dinner, birthday"
          value={form.occasion}
          onChange={handleChange}
        />
        <Typography fontWeight={"light"}>Table Size</Typography>
        <Select
          name="tableSize"
          value={form.tableSize}
          onChange={handleChange}
          sx={{ width: "100%" }}
        >
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={8}>8</MenuItem>
        </Select>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button variant="outlined" onClick={() => setStage(0)}>
          Back
        </Button>
        <Button type="submit" variant="contained" >
          Next
        </Button>
      </Box>
    </form>
  );
};

export default ReservationDetails;
