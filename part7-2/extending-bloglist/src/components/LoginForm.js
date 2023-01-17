import { useField } from "../hooks/index";
import { useDispatch } from "react-redux";
import { logUserIn } from "../reducers/loginReducer";
import { TextField, Button } from "@mui/material";

import Notification from "./Notification";

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value,
    };
    dispatch(logUserIn(credentials));
    resetUsername();
    resetPassword();
  };

  return (
    <div>
      <h2 className="header-title">Blogs App</h2>
      <Notification />
      <h4>Log in to application</h4>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username"
            id="filled-size-normal"
            size="small"
            variant="filled"
            {...username}
          />
        </div>
        <p></p>
        <div>
          <TextField
            label="Password"
            id="filled-size-normal2"
            size="small"
            variant="filled"
            {...password}
          />
        </div>
        <p></p>
        <Button variant="outlined" color="primary" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
