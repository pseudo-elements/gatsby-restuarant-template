import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    code: "USD",
    symbol: "$",
  },
  reducers: {
    setCurrency: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
