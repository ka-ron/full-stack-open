import { connect } from "react-redux";

const Notification = (props) => {
  const style2 = {
    padding: 0,
    marginTop: 0,
    border: 0,
  };

  const style3 = {
    border: "solid",
    padding: 10,
    marginTop: 20,
  };

  const style = props.notification === null ? style2 : style3;

  return <div style={style}>{props.notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
