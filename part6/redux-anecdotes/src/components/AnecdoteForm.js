import { connect } from "react-redux";
import { newAnec } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault();
    const content = event.target.newAnec.value;
    event.target.newAnec.value = "";

    props.newAnec(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="newAnec" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  newAnec,
};

const ConnectedAnecdotes = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdotes;
