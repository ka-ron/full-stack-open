import { filtered } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value;
    props.filtered(filter);
  };
  const style = {
    marginTop: 30,
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filtered,
};

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
