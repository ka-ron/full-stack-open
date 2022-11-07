import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeAnecdotes, votingAnec } from "../reducers/anecdoteReducer";

import { votedFor, createNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(votingAnec(anecdote));
  };

  const votedNotification = (anecdote) => {
    console.log(`voted for ${anecdote.content}`);
    dispatch(votedFor(anecdote.content));
    dispatch(createNotification(`You voted for: ${anecdote.content}`, 5));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button
              onClick={() => {
                vote(anecdote);
                votedNotification(anecdote);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
