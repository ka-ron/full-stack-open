import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [
  {
    content: "If it hurts, do it more often",
    id: "47145",
    votes: 0,
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    id: "21149",
    votes: 0,
  },
  {
    content:
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    id: "69581",
    votes: 0,
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    id: "36975",
    votes: 0,
  },
  {
    content: "Premature optimization is the root of all evil.",
    id: "25170",
    votes: 0,
  },
  {
    content:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    id: "98312",
    votes: 0,
  },
];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    update(state, action) {
      const votedAnecdote = action.payload;
      const id = votedAnecdote.id;
      const sort = state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
      return [...sort].sort((a, b) => b.votes - a.votes);
    },

    setAnecdotes(state, action) {
      return [...action.payload].sort((a, b) => b.votes - a.votes);
    },

    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
  },
});

export const { update, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const newAnec = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdotes(newAnecdote));
  };
};

export const votingAnec = (content) => {
  return async (dispatch) => {
    const updateAnecdote = await anecdoteService.voteFor(content);
    dispatch(update(updateAnecdote));
  };
};

export default anecdoteSlice.reducer;
