import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendVote(state, action) {
      var anecdoteId = action.payload.id
      var editedAnecdote = action.payload.updatedAnecdote
      return state.map(anecdote => (anecdoteId === anecdote.id) ? editedAnecdote : anecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(asObject(anecdote))
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async dispatch => {
     const updatedAnecdote = await anecdoteService.addVote(id)
    dispatch(appendVote({id, updatedAnecdote}))
  }
}



export const { appendVote, setAnecdote, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer