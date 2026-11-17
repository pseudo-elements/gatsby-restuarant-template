import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import FormWorker from "../../utils/formWorker";

const ContactInfo = ({ setStage, setReservationForm }) => {
  const formWorker = new FormWorker();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({ name: "required", email: "required" });
  const [touched, setTouched] = useState({});

  const handleChange = ({ target }) => {
    setErrors(formWorker.getErrors(errors, target));
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleBlur = ({ target }) => {
    setTouched((prev) => ({ ...prev, [target.name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReservationForm((prev) => ({ ...prev, ...form }));
    setStage(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "min(400px, 100%)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography fontWeight={"light"} fontSize={"1.2rem"}>
        Contact Info
      </Typography>
      <TextField
        type="username"
        name="name"
        label="name"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(touched.name) && Boolean(errors.name)}
        helperText={(touched.name && errors.name) || " "}
      />
      <TextField
        type="email"
        name="email"
        label="email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(touched.email) && Boolean(errors.email)}
        helperText={(touched.email && errors.email) || " "}
      />
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button
          type="submit"
          variant="contained"
          disabled={Object.keys(errors).length}
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

export default ContactInfo;
