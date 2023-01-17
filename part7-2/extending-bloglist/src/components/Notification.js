// import { Alert } from "@mui/material";

// const Notification = ({ message }) => {
//   if (message === null) {
//     return null;
//   }

//   return <Alert>{message}</Alert>;
// };

// export default Notification;

import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  let dom = null;

  if (notification) {
    dom = <Alert severity={notification.type}>{notification.message}</Alert>;
  }

  return dom;
};

export default Notification;

// import { useSelector } from "react-redux";
// import { Alert } from "@mui/material";

// const Notification = () => {
//   const notification = useSelector((state) => state.notification);

//   if (notification === null) return null;

//   return <Alert severity={notification.type}>{notification.message}</Alert>;
// };

// export default Notification;
