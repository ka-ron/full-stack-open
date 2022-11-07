import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filtered(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { filtered } = filterSlice.actions;
export default filterSlice.reducer;
