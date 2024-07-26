const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const addVotes = (id) => {
  return {
    type: 'ADD_VOTES',
    payload: { id }
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: { anecdote }
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_VOTES':
      var anecdoteToChange = state.find(anecdote => anecdote.id === action.payload.id)
      var editedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      return state.map(anecdote => (action.payload.id === anecdote.id) ? editedAnecdote : anecdote)
    case 'ADD_ANECDOTE':
      return [...state, asObject(action.payload.anecdote)]
    default:
      return state
  }
}

export default reducer