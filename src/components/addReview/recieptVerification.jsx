import { Box, Button, Link, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import FormWorker from "../../utils/formWorker";
import { navigate } from "gatsby";

const RecieptVerification = ({ item }) => {
  const formWorker = new FormWorker();
  const [recieptId, setRecieptId] = useState("");
  const [errors, setErrors] = useState({ recieptId: "required" });
  const [touched, setTouched] = useState({});

  const handleChange = ({ target }) => {
    setErrors(formWorker.getErrors(errors, target));
    setRecieptId(target.value);
  };

  const handleBlur = ({ target }) => {
    setTouched({ ...touched, [target.name]: true });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/add-review/${recieptId}${item ? `?item=${item}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography>Enter your reciept ID to verify purchase</Typography>
      <TextField
        label="Reciept identification number"
        variant="outlined"
        name="recieptId"
        onBlur={handleBlur}
        error={Boolean(touched.recieptId) && Boolean(errors.recieptId)}
        helperText={(touched.recieptId && errors.recieptId) || " "}
        value={recieptId}
        onChange={handleChange}
      />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Link href={item ? `/menu-item/${item}` : "/menu"}>
          <Button variant="outlined">Cancel</Button>
        </Link>
        <Button type="submit" variant="contained" disabled={errors.recieptId}>
          Verify
        </Button>
      </Box>
    </form>
  );
};

export default RecieptVerification;
