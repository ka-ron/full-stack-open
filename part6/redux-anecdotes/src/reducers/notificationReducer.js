import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    votedFor(state, action) {
      return action.payload;
    },
  },
});

let timeoutId = null;

export const createNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(votedFor(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => dispatch(votedFor(null)), delay * 1000);
  };
};

export const { votedFor } = notificationSlice.actions;

export default notificationSlice.reducer;
