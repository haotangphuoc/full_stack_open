import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVotes(state, action) {
      var anecdoteToChange = state.find(anecdote => anecdote.id === action.payload)
      var editedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => (action.payload === anecdote.id) ? editedAnecdote : anecdote)
    },
    addAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { addVotes, addAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer